import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

export const saveInitialData = async () => {
  const initialData = {
    featuresData: [
      {
        title: 'Vision',
        description: "To be a centre of Business Excellence that sustainably meets the needs of Private Sector Growth and Development",
        icon: 'Star',
      },
      {
        title: 'Mission',
        description: "Our mission is to provide client-focused capacity building in entrepreneurship, business development, micro-finance support, research, advocacy, and foster alliances for sustainable livelihoods",
        icon: 'Star',
      },
      {
        title: 'Core Values',
        description: "We values mutual respect, accountability, teamwork, professionalism, and faith to guide its efforts in community empowerment and poverty reduction",
        icon: 'Star',
      }
    ],
    backgrounds: [
      {
        title: 'Top Community Development',
        description: "At APSEDEC, we drive change by empowering communities, enhancing agricultural productivity, and advancing financial inclusivity. Our mission is to uplift socio-economic standards through focused initiatives and strong partnerships, aiming for a future where prosperity and growth are accessible to all in the Acholi Sub-region. Join our journey towards a thriving economy",
        icon: 'Globe',
      }
    ],
    whoWeAreData: {
      title: 'Who We Are',
      description: "The Acholi Private Sector Development Company Limited (APSEDEC) is an organization dedicated to fostering business excellence and supporting the growth and development of the private sector. Our focus is on reducing poverty, enhancing income generation, and ensuring sustainable livelihoods through various programs including financial inclusion, agricultural productivity improvement, and youth empowerment. Collaborating with government bodies, international donors, and communities, we aim to strengthen the economic fabric of the Acholi Sub-region and beyond",
    },
    headerData: {
      title: 'ACHOLI PRIVATE SECTOR DEVELOPMENT COMPANY LIMITED',
      description: "Empowering local communities through sustainable private sector development since 1999, APSEDEC stands as a beacon of progress. With a steadfast commitment to driving economic growth, we work tirelessly to uplift and empower communities across Uganda. Join us in building a brighter future for all",
    },
    managementData: [
      {
        title: 'Ownership and Governance',
        description: "The organization comprises 26 member entities from the private, public, and civil sectors, governed by a Board of Directors elected from these members. This Board ensures the company adheres to its vision, mission, and objectives",
        icon: 'Users',
      }
    ],
    servicesData: [
      {
        title: 'Business Development Services',
        description:
          'Our Business Development Services aim to empower individual and group enterprises in both public and private sectors. We provide strategic support, market analysis, and growth planning, enhancing competitiveness and fostering sustainable livelihoods.',
        icon: 'Briefcase',
      },
      {
        title: 'Microfinance Support Services',
        description:
          'Our Microfinance Support Services offer training and technical guidance to Village Savings and Loan Associations (VSLAs), Savings and Credit Cooperatives (SACCOs), and Microfinance Institutions (MFIs). We focus on governance, operational efficiency, and product development to strengthen financial inclusion and empower entrepreneurs.',
        icon: 'BarChart2',
      },
      {
        title: 'Information Dissemination',
        description:
          'Through our Information Dissemination initiatives, we provide vital business intelligence and promote financial literacy. Our services include internet and IT access through District Business Information Centers, collaboration with Uganda Export Promotion, and partnership with Microfinance Apex Institutions for widespread dissemination of financial knowledge.',
        icon: 'Info',
      },
      {
        title: 'Consultancy Services',
        description:
          'Our Consultancy Services cover various areas such as business plan development, training, and manual creation. We specialize in agricultural value chain development, policy manual creation for financial institutions, and public awareness campaigns on HIV/AIDS prevention and road safety.',
        icon: 'Lightbulb',
      },
    ],
    contactData: [
      {
        title: 'Contact Us',
        description: 'Whether it’s a question about our services, a request for technical assistance, or suggestions for improvement, our team is eager to hear from you',
        icon: 'Info',
      }
    ],
    aboutUsData: [
      {
        title: 'Our Team',
        description: "The APSEDEC team operates within a meticulously defined organizational structure, ensuring each member's role optimally utilizes their unique skills and expertise. From strategic leaders guiding direction to operational staff executing grassroots initiatives, every individual contributes to a cohesive environment fostering growth and development. Clear communication channels facilitate seamless coordination, enabling rapid adaptation to changing circumstances. Central to APSEDEC's organizational principles is a dedication to inclusivity and sustainability. Regular engagement and feedback mechanisms cultivate a culture of openness and mutual respect, facilitating the exchange of ideas and informed decision-making. Guided by a shared vision, the team leverages partnerships with governmental bodies, international donors, and local stakeholders to combine resources and knowledge for impactful change. United in their mission, they work towards poverty alleviation, economic resilience, and the prosperity of every member of the Acholi community",
        icon: 'Info',
      },
      {
        title: 'Mission',
        description: "At APSEDEC, Our mission is to empower individuals and communities towards sustainable livelihoods by providing tailored capacity-building programs in entrepreneurship, business development, and micro-finance. We conduct research to inform our interventions, advocate for policy changes that support economic opportunity, and foster strong alliances to maximize our collective impact.",
        icon: 'Star',
      },
      {
        title: 'Vision',
        description: "We envision becoming a globally recognized center of Business Excellence, fostering a culture of innovation and collaboration to empower businesses of all sizes. Through this, we'll drive sustainable growth and development for the private sector, creating a ripple effect of economic prosperity and social well-being, while establishing ourselves as a leader in ethical and sustainable business practices.",
        icon: 'Star',
      },
      {
        title: 'Our Trusted Partners',
        description: "In fulfilling our mission, APSEDEC partners with local, national, and international organizations/institutions to provide subsidized and sustainable services to vulnerable communities in the region. We promote participatory approaches while adopting private sector strategies for enhancing competitiveness and ownership as a strategy. These include Civil Society Organizations, Government and Non-Government Organizations to implement development programs in the Acholi sub-region",
        icon: 'Star',
      }
    ],
    objectivesData: [
      {
        description: "Offer Business Development Services to various enterprises and organizations across the public and private sectors, aimed at enhancing income, livelihoods, and competitiveness.",
      },
      {
        description: "Support and promote entrepreneurship among informal, micro, small, and medium enterprises through specialized services.",
      },
      {
        description: "Provide microfinance support, including training, technical guidance, and advocacy for institutions like Village Savings and Loan Associations (VSLA), Savings and Credit Cooperatives (SACCOs), and microfinance institutions (MFIs), focusing on governance, operations, and system development.",
      },
      {
        description: "Conduct research and development to bolster our business objectives.",
      },
      {
        description: "Develop strategic linkages, partnerships, and institutional development with various entities to foster income generation and sustainable livelihoods.",
      },
      {
        description: "Promote advanced agricultural post-harvest techniques, improved methods, and value addition technologies.",
      }
    ]
  };

  try {
    await setDoc(doc(db, "APSEDECContent", "contentData"), initialData);
    console.log("Initial data saved successfully");
  } catch (error) {
    console.error("Error saving initial data: ", error);
  }
};
