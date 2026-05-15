import MedicalSiteMockup from "./MedicalSiteMockup";
import BeautySiteMockup from "./BeautySiteMockup";
import DefaultSiteMockup from "./DefaultSiteMockup";

function PortfolioMockupRenderer({ project }) {
  if (project.mockupType === "medical") {
    return <MedicalSiteMockup />;
  }

  if (project.mockupType === "beauty") {
    return <BeautySiteMockup />;
  }

  return <DefaultSiteMockup project={project} />;
}

export default PortfolioMockupRenderer;