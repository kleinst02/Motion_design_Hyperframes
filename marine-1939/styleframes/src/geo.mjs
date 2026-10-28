// Coastlines of the charts used by direction B, projected to SVG paths (Natural Earth via world-atlas).
// Usage: node geo.mjs <geo-deps/node_modules> <out.json>
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const [mods, out] = process.argv.slice(2);
const load = (pkg) => import(pathToFileURL(join(mods, pkg, "src", "index.js")).href);
const topo = await load("topojson-client");
const d3 = await load("d3-geo");

const atlas = (name) => JSON.parse(readFileSync(join(mods, "world-atlas", name), "utf8"));

const PLACES = {
  toulon: [5.93, 43.12], marseille: [5.37, 43.30], merselkebir: [-0.70, 35.73], oran: [-0.64, 35.70],
  alger: [3.06, 36.75], brest: [-4.49, 48.39], gibraltar: [-5.35, 36.14], newyork: [-74.01, 40.71],
  bizerte: [9.87, 37.27], ajaccio: [8.74, 41.92], casablanca: [-7.62, 33.59],
  r1: [-62.0, 39.6], r2: [-45.0, 38.4], r3: [-28.0, 37.2], r4: [-12.0, 36.0], r5: [-2.0, 36.4],
  r6: [1.9, 39.0], r7: [4.6, 41.6], golfe: [3.9, 42.75], corse: [8.6, 42.6],
  // Route of direction D: out of New York by the Narrows and Sandy Hook, south of Santa Maria (Azores), through the
  // middle of the strait of Gibraltar, round the Balearics by the south and the east, into the roads from the south.
  narrows: [-74.04, 40.6], sandyhook: [-73.86, 40.45], r3d: [-28.0, 36.6], strait: [-5.6, 35.96],
  bals: [2.0, 38.35], bale: [5.2, 39.6], toulonapp: [5.98, 42.98],
};

function chart({ name, data, object, bbox, width, height, step }) {
  const [[lon0, lat0], [lon1, lat1]] = bbox;
  // Keep only the polygons near the chart: a far polygon (Antarctica) can turn into a fill of the whole clip extent.
  const all = topo.feature(data, data.objects[object]);
  const features = all.type === "FeatureCollection" ? all.features : [all];
  const polygons = features.flatMap((f) => (f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates));
  const near = (poly) => {
    const [[w, s], [e, n]] = d3.geoBounds({ type: "Polygon", coordinates: poly });
    if (n < lat0 - 3 || s > lat1 + 3) return false;
    const spans = w <= e ? [[w, e]] : [[w, 180], [-180, e]];
    return spans.some(([a, b]) => b >= lon0 - 3 && a <= lon1 + 3);
  };
  // A few rings of land-10m are wound the wrong way: d3 reads them as the whole sphere minus an islet. Rewind them.
  const rewound = polygons.map((poly) =>
    d3.geoArea({ type: "Polygon", coordinates: poly }) > 2 * Math.PI ? poly.map((ring) => ring.slice().reverse()) : poly);
  const land = { type: "MultiPolygon", coordinates: rewound.filter(near) };
  const projection = d3.geoMercator()
    .fitExtent([[0, 0], [width, height]], { type: "MultiPoint", coordinates: [[lon0, lat0], [lon1, lat1]] })
    .clipExtent([[-40, -40], [width + 40, height + 40]]);
  const path = d3.geoPath(projection).digits(1);
  const graticule = d3.geoGraticule().extent([[lon0 - step, lat0 - step], [lon1 + step, lat1 + step]]).step([step, step]);
  const places = Object.fromEntries(Object.entries(PLACES).map(([k, ll]) => [k, projection(ll).map((v) => Math.round(v))]));
  const meridians = [], parallels = [];
  for (let lon = Math.ceil(lon0 / step) * step; lon <= lon1; lon += step) meridians.push([lon, Math.round(projection([lon, (lat0 + lat1) / 2])[0])]);
  for (let lat = Math.ceil(lat0 / step) * step; lat <= lat1; lat += step) parallels.push([lat, Math.round(projection([(lon0 + lon1) / 2, lat])[1])]);
  return { name, width, height, land: path(land), graticule: path(graticule()), places, meridians, parallels };
}

const result = {
  med: chart({ name: "med", data: atlas("land-10m.json"), object: "land", bbox: [[-3.5, 34.4], [10.6, 45.2]], width: 4200, height: 3900, step: 1 }),
  atlantic: chart({ name: "atlantic", data: atlas("land-50m.json"), object: "land", bbox: [[-80, 24], [16, 54]], width: 3600, height: 1900, step: 5 }),
};
writeFileSync(out, JSON.stringify(result));
for (const c of Object.values(result)) console.log(c.name, c.width + "x" + c.height, "land path", c.land.length, "chars", JSON.stringify(c.places));
