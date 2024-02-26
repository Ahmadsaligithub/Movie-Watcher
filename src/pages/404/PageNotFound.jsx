import React from "react";
import "./PageNotFound.css";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const PageNotFound = () => {
  return (
    <div className="errorMSG">
      <ContentWrapper>
        <h1>404 ERROR</h1>
      </ContentWrapper>
    </div>
  );
};

export default PageNotFound;
