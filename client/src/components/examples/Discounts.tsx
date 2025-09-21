//todo: remove mock functionality
import Discounts from '../Discounts';

export default function DiscountsExample() {
  const mockCoupons = [
    {
      id: "1",
      provider: "SAS",
      certification: "SAS Certified Data Scientist",
      category: "Data Analytics",
      discount: "30% OFF",
      code: "SAS30STUDENT",
      description: "Master statistical analysis and machine learning with SAS tools. Industry-recognized certification for data scientists.",
      validUntil: "Dec 31, 2024",
      originalPrice: "$299",
      discountedPrice: "$209",
      features: [
        "Statistical Analysis Mastery",
        "Machine Learning Techniques", 
        "SAS Programming Skills",
        "Real-world Case Studies",
        "Industry Recognition"
      ],
      difficulty: "Advanced" as const
    },
    {
      id: "2",
      provider: "Oracle",
      certification: "Oracle Database Administrator",
      category: "Database",
      discount: "25% OFF", 
      code: "ORACLE25EDU",
      description: "Become proficient in Oracle database administration. Essential certification for database professionals.",
      validUntil: "Nov 15, 2024",
      originalPrice: "$395",
      discountedPrice: "$296",
      features: [
        "Database Installation & Config",
        "Backup & Recovery",
        "Performance Tuning",
        "Security Management",
        "High Availability"
      ],
      difficulty: "Intermediate" as const
    },
    {
      id: "3",
      provider: "IBM",
      certification: "IBM Cloud Professional Architect",
      category: "Cloud Computing",
      discount: "40% OFF",
      code: "IBM40CLOUD", 
      description: "Design and implement cloud solutions on IBM Cloud platform. Perfect for cloud architects and engineers.",
      validUntil: "Jan 31, 2025",
      originalPrice: "$450",
      discountedPrice: "$270",
      features: [
        "Cloud Architecture Design",
        "Multi-cloud Solutions",
        "Security & Compliance",
        "DevOps Integration",
        "Cost Optimization"
      ],
      difficulty: "Advanced" as const
    },
    {
      id: "4",
      provider: "Cisco", 
      certification: "CCNA - Cisco Certified Network Associate",
      category: "Networking",
      discount: "20% OFF",
      code: "CCNA20NET",
      description: "Foundation certification for networking professionals. Covers routing, switching, and network fundamentals.",
      validUntil: "Oct 30, 2024",
      originalPrice: "$325", 
      discountedPrice: "$260",
      features: [
        "Network Fundamentals",
        "Routing & Switching", 
        "IP Services",
        "Network Security",
        "Automation & Programmability"
      ],
      difficulty: "Beginner" as const
    },
    {
      id: "5",
      provider: "Cisco",
      certification: "CCNP Enterprise - Advanced Routing",
      category: "Networking", 
      discount: "35% OFF",
      code: "CCNP35ADV",
      description: "Advanced networking certification focusing on enterprise routing and services. For experienced network engineers.",
      validUntil: "Dec 15, 2024",
      originalPrice: "$400",
      discountedPrice: "$260", 
      features: [
        "Advanced Routing Protocols",
        "VPN Technologies",
        "Network Services",
        "Troubleshooting",
        "Enterprise Solutions"
      ],
      difficulty: "Advanced" as const
    },
    {
      id: "6",
      provider: "SHRM",
      certification: "SHRM Certified Professional (SHRM-CP)",
      category: "Human Resources",
      discount: "15% OFF",
      code: "SHRM15HR",
      description: "Comprehensive HR certification covering all aspects of human resource management. Globally recognized credential.",
      validUntil: "Sep 30, 2024", 
      originalPrice: "$375",
      discountedPrice: "$319",
      features: [
        "HR Strategy & Planning",
        "Talent Acquisition",
        "Employee Relations",
        "Compensation & Benefits",
        "Risk Management"
      ],
      difficulty: "Intermediate" as const
    }
  ];

  return (
    <Discounts 
      coupons={mockCoupons}
      onRedeemCoupon={(id) => console.log('Redeem coupon:', id)}
    />
  );
}