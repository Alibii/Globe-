import * as d3 from 'd3';
import * as turf from '@turf/turf';

const width = 800;
const height = 600;

export function initMap() {
    const svg = d3.select("#map");

    const projection = d3.geoMercator()
        .scale(1000)
        .center([67, 48])
        .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    d3.json('/data/kazakhstan-regions.json').then(data => {
        const region1 = data.features.find(f => f.properties.name === "Ulytau");
        const region2 = data.features.find(f => f.properties.name === "Karaganda");
        const mergedRegion = turf.union(region1, region2);

        // Render regions
        svg.selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", "#69b3a2")
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5)
            .on("mouseover", function(event, d) {
                d3.select(this)
                    .attr("fill", "#ffcc00")
                    .attr("stroke", "#000")
                    .attr("stroke-width", 1);
            })
            .on("mouseout", function(event, d) {
                d3.select(this)
                    .attr("fill", "#69b3a2")
                    .attr("stroke", "#fff")
                    .attr("stroke-width", 0.5);
            });

        // Add region labels
        svg.selectAll("text")
            .data(data.features)
            .enter()
            .append("text")
            .attr("x", d => path.centroid(d)[0])
            .attr("y", d => path.centroid(d)[1])
            .attr("text-anchor", "middle")
            .attr("font-size", "10px")
            .attr("fill", "#fff")
            .text(d => d.properties.name);
    }).catch(error => {
        console.error("Error loading GeoJSON:", error);
    });
}