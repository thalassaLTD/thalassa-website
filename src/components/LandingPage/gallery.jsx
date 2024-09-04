import { Image } from "./image";
import React from "react";

export const Gallery = (props) => {
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Example Projects</h2>
          <p>
            We use data to inform the creation of realistic digital twins to inform decisionmaking
          </p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {props.data
              ? props.data.map((d, i) => (
                  <div
                    key={`${d.title}-${i}`}
                    className="col-sm-6 col-md-4 col-lg-4 mb-4"
                  >
                    <a href={d.url} target="_blank" rel="noopener noreferrer" className="card-link">
                  
                      <div className="card p-3">
                        <Image
                          title={d.title}
                          largeImage={d.largeImage}
                          smallImage={d.largeImage}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{d.title}</h5>
                        </div>
                      </div>
                    </a>
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
