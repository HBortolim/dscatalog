import ContentLoader from "react-content-loader";

const CardLoader = () => (
  <div className="loader-container">
    <ContentLoader
      width={320}
      height={460}
      viewBox="0 0 320 460"
      backgroundColor="#ecebeb"
      foregroundColor="#d6d2d2"
    >
      <rect x="320" y="9" rx="2" ry="2" width="140" height="10" />
      <rect x="14" y="30" rx="2" ry="2" width="667" height="11" />
      <rect x="12" y="58" rx="2" ry="2" width="211" height="211" />
      <rect x="240" y="57" rx="2" ry="2" width="211" height="211" />
      <rect x="467" y="56" rx="2" ry="2" width="211" height="211" />
      <rect x="12" y="283" rx="2" ry="2" width="211" height="211" />
      <rect x="240" y="281" rx="2" ry="2" width="211" height="211" />
      <rect x="468" y="279" rx="2" ry="2" width="211" height="211" />
      <rect x="378" y="524" rx="0" ry="0" width="52" height="24" />
      <rect x="210" y="523" rx="0" ry="0" width="52" height="24" />
    </ContentLoader>
  </div>
);

CardLoader.metadata = {
  name: "Hassan Tijani.A",
  github: "surepeps",
  description: "Image Grid with Pagination",
  filename: "ImageGrid",
};

export default CardLoader;
