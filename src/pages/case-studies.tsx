import React from "react";

import Layout from "../components/Layout";
import CaseStudies from "../components/CaseStudies";
import SEO from "../components/seo";

const studies = [
    {
        text: [
            ["Trikwan – Morpheus 8 Case Study"],
            [],
            ["Treatment 1", "19/11/20"],
            ["TIP", "Morpheus 8 tip (24 PIN)"],
            ["Area", "Lower face and neck"],
            ["Depths and Energy level", "3mm depth with 25 RF energy level double pulsed. Plus 2mm depth with 20 RF energy level single pulsed."],
            ["Pulse count", "350"],
            ["Treatment 2", "23/02/21"],
            ["TIP", "Morpheus 8 tip (24 PIN)"],
            ["Area", "Lower face and neck"],
            ["Depths and Energy level", "3mm depth with 35 RF energy level double pulsed. Plus 2mm depth with 25 RF energy level single pulsed."],
            ["Pulse count", "400-450"],
            ["Treatment 3", "24/03/21"],
            ["TIP", "M8 Resurfacing tip"],
            ["Area", "Lower face and neck"],
            ["Depths and Energy level", "resurfacing tip with 30 RF energy, fixed."],
            ["Pulse count", "260"],
            [],
            ["Patient was also on Obagi medical POM products during this time.", ""]
        ],
        icon: "case_01",
        alt: "Trikwan case study",
    },
    {
        text: [
            ["Physician", "Dr Nicola Willis"],
            ["Patient Information", "37 year old skin type II female (2 previous pregnancies)"],
            ["Height", "162cm"],
            ["Weight", "66.5kg"],
            ["BMI", "25.3"],
            ["Procedure", "BodyTite to Anterior Abdomen and flanks"],
            ["Sessions", "1 Session"],
            ["Anaesthesia", "Local.  Tumescent: 2% lignocaine plus 1mg adrenaline in 500ml Hartmanns solution. Total infused 2 Litres"],
            ["Handpiece", "40W BodyTite"],
            ["Settings", "Ext 42.     Int 70"],
            ["Energy Delivered",""],
            ["Anterior Abdomen", " 4 areas, 2 above umbilicus, 2 below. 3 levels    targeted. 5KJ on average per level per area.  60 KJ total."],
            ["Flanks", "2 levels each side. Energy delivered  10 KJ each side. Total 20KJ"],
            ["Total for procedure", "80KJ"],
            ["Followed by Liposuction using", "2 mm 3 orif cannula 1300ml from Anterior abdomen, 200ml each flank. TOTAL 1700"],
            ["Followed by MORPHEUS 8", "24pin 62MJ Fixed 1.5 PPS Total pulses 1033"]
        ],
        icon: "case_02",
        alt: "bodytite_CS1_NW",
    },
    {
        text: [
            ["Physician", "Hannah Depledge (RGN) at Eterno Aesthetics Sheffield"],
            ["Patient", "28 Year Old Female, Skin Type: II"],
            ["Procedure", "2 Morpheus8 Treatments in combination with topical ZO skincare protocol for severe acne, including tretanoin. "],
            ["Energy level", "35-50"],
            ["Number of shots", "246-420 and 2 passes for each treatment "],
            ["Depth", "2mm-3mm for cheeks and jawline"],
            ["Results", "At the start of her journey, the patient suffered with severe hormonal acne.  The skin was preconditioned with ZO Skin Health for around three months and when the majority of the active acne had cleared she was left with red pigmented scarring and some pitting to the skin. Now, her skin is brighter and firmer, the scarring has vastly improved in both texture and colour. The scars are flatter and the purple pigmented lesions are much lighter. The patient is thrilled, and described the results as life changing.  Her confidence has vastly improved as a result. A third treatment was planned but due to covid this had to be postponed."]
        ],
        icon: "case_03",
        alt: "M8_CS2_HD",
    },
    {
        text: [
            ["Physician", "Cheryl Pullen (RGN) at Calla Aesthetics "],
            ["Patient", "AGE 55 Female Skin Type: II"],
            ["Procedure", "3 Morpheus8 Treatments (24 pins), 6 weeks apart"],
            ["Energy level", "40 -55 kj "],
            ["Number of shots", "430 - 685 "],
            ["Depth", "2mm-4mm neck/chin/jawline"],
            ["Anaesthesia", "Local "],
        ],
        icon: "case_04",
        alt: "CPullen-case-study",
    },
    {
        text: [
            ["Physician", "Sian from Aesthetically You"],
            ["Patient Information", "Skin type III female"],
            ["Patient Objectives", "To feel more confident in her Zoom meetings during lockdown, and to achieve a tighter jawline and improvement of eye bags "],
            ["Procedure", "Morpheus8 24 pin + Morpheus8 Prime"],
            ["Sessions", "3 Sessions Morpheus8-face and neck/1 session Morpheus8 Prime"],
            ["Anaesthesia", "Topical"],
            [],
            ["Parameters :"],
            ["Tip", "24 pins / 12 pins"],
            ["Depth", "3mm / 2mm"],
            ["Energy", "44kj / 22kj"],
            ["Shots", "755 / 345"],
            ["Results", "18 weeks"],
        ],
        icon: "case_05",
        alt: "Aesthetically You",
    },
    {
        text: [
            ["Physician", "Khatra Paterson"],
            [],
            ["Patient skin type", "FP II"],
            [],
            ["Procedure", "Morpheus8: 3 sessions, spaced one month apart"],
            [],
            ["Parameters:"],
            ["1st Treatment", "Face- 40kj, Depth:  3mm then 30kj at 2mm fixed.  Neck- 40kj Depth 3mm/ 30kj 2mm fixed.  Chin- 30kj Depth: 3mm/2mm and under eyes 20kj Depth:  2mm on cycle mode for both"],
            ["2nd Treatment", "Same as above"],
            ["3rd Treatment", "Face- 40kj lower face/jowls 55mm 3mm and 30kj at 2mm.  Neck- 40kj 3mm then 30kj at 2mm.  Chin- 30kj Depth: 3mm/2mm and under eyes 20kj Depth:  2mm cycle for both chin and under the eyes"],
        ],
        icon: "case_06",
        alt: "KPA case study",
    },
    {
        text: [
            ["Physician", "SV Aesthetics"],
            ["Procedure", "Lumecca IPL 515nm"],
            ["Number of Sessions", "Before & After 3 Sessions on Full Face"],
            ["Age", "Female, 33"],
            ["Area Treated", "Full Face"],
            ["Energy", "12 J/cm2"],
            ["Cooling", "Strong "],
            [],
            ["Description/More Details"],
            ["Female with skin type 2 requested treatment to reduce hyper pigmentation on full face (concentrate on forehead). These are the results after 3 sessions. On each session we did one pass on the entire face & a 2nd lower pass after 15 minutes on a 20% reduced settings – we avoided the forehead on the 2nd pass. Pigments darkened after each session & then became lighter. The patient was extremely happy with the results after 12 weeks."]
            
        ],
        icon: "case_07",
        alt: "InMode Lumecca Case Studies"
    },
    {
        text: [
            ["Physician", "SV Aesthetics "],
            ["Procedure", "Lumecca IPL 515nm"],
            ["Number of Sessions", "Before & After 2 Sessions on Full Face"],
            ["Age", "Female, 28"],
            ["Area Treated", "Full Face"],
            ["Energy", "10 J/cm2"],
            ["Cooling", "Strong "],
            [],
            ["Description/More Details"],
            ["Female with skin type 2 requested treatment to reduce hyper pigmentation & freckles on full face (concentrate on under eyes). These are the results after 2 sessions. On each session we did one pass on the entire face & a 2nd lower pass after 15 minutes on a 20% reduced settings – we avoided the forehead on the 2nd pass. Pigments darkened after each session & then became lighter. The patient was extremely happy with the results after 6 weeks."]
            
        ],
        icon: "case_08",
        alt: "InMode Lumecca Case Studies"
    },
    {
        text: [
            ["Physician", "SV Aesthetics "],
            ["Procedure", "Lumecca IPL 515nm"],
            ["Number of Sessions", "Before & After 2 Sessions on Full Face"],
            ["Age", "Female, 35"],
            ["Area Treated", "Full Face"],
            ["Energy", "12 J/cm2"],
            ["Cooling", "Strong "],
            [],
            ["Description/More Details"],
            ["Female with skin type 1 requested treatment to reduce freckles on full face. These are the results after 2 sessions. On each session we did one pass on the entire face & a 2nd lower pass after 15 minutes on a 20% reduced settings – we avoided the forehead on the 2nd pass. Pigments darkened after each session & then became lighter."]
            
        ],
        icon: "case_09",
        alt: "InMode Lumecca Case Studies"
    },
    {
        text: [
            ["Physician", "SV Aesthetics "],
            ["Procedure", "Lumecca IPL 515nm"],
            ["Number of Sessions", "Before & After 2 Sessions on Full Face"],
            ["Age", "Female, 34"],
            ["Area Treated", "Full Face"],
            ["Energy", "10 J/cm2"],
            ["Cooling", "Strong "],
            [],
            ["Description/More Details"],
            ["Female with skin type 2 requested treatment to reduce pigmentation (with emphasis on forehead). These are the results after 2 sessions. On each session we did one pass on the entire face & a 2nd lower pass after 15 minutes on a 20% reduced settings – we avoided the forehead on the 2nd pass. Pigments darkened after each session & then became lighter. We will complete another session & review the results."]
            
        ],
        icon: "case_10",
        alt: "InMode Lumecca Case Studies"
    },
    {
        text: [
            ["Physician", "SV Aesthetics "],
            ["Procedure", "Lumecca IPL 515nm"],
            ["Number of Sessions", "Before & After 2 Sessions on Full Face"],
            ["Age", "Female, 26"],
            ["Area Treated", "Full Face"],
            ["Energy", "10 J/cm2 – Short Pulse "],
            ["Cooling", "Strong "],
            [],
            ["Description/More Details"],
            ["Female with skin type 1 requested treatment to reduce redness & broken capillaries (with emphasis on nose). These are the results after 2 sessions. On each session we did one pass on the entire face & a 2nd lower pass after 15 minutes on a 20% reduced settings. Some of the broken capillaries darkened after each session & then broke down. We will complete another session & review the results."]
            
        ],
        icon: "case_11",
        alt: "InMode Lumecca Case Studies"
    },
    {
        text: [
            ["Physician", "Theresa Goldsmith"],
            ["Procedure", "Morpheus8 on Face and Neck x 2 treatments"],
            ["Energy Level", "25-35"],
            ["Pulse Count", "500 1st treatment, 340 2nd treatment. 50% overlapping"],
            ["Depth", "Face 2mm and Neck 3mm"],
            ["Results"],
            ["", "- 1st treatment 7.7.21"],
            ["", "- 2nd treatment 1.10.21"],
            ["", "- Pictures taken prior to 3rd treatment on 11.11.21."],
            ["Full recommended monthly protocol not upheld due to patient being unable to attend clinic on a monthly basis."]
            
        ],
        icon: "case_12",
        alt: "Case Study Morpheus8 FACE TG"
    }
];

const CaseStudiesPage = () => {
    return (
      <Layout title="case-studies">
        <SEO title="Case Studies"/>
        <CaseStudies studies={studies}/>
      </Layout>
    );
};

export default CaseStudiesPage;