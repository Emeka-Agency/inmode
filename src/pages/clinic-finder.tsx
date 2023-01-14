import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import ClinicalFinder from "../components/ClinicFinder/index";

const ClinicFinder = () => {

    const maps_script_link = () => {
        return (
            <script async
                src={`https://maps.googleapis.com/maps/api/js?key="${process.env.MAP_API_KEY}&libraries=places&callback=initMap`}>
            </script>
        );
    }

    return (
        <Layout title="clinic-finder">
            <SEO title="Clinic Finder"/>
            {maps_script_link()}
            <ClinicalFinder/>
        </Layout>
    );
}

export default ClinicFinder;