import { useEffect, useState } from "react";
import { apiClient } from "../utils/brewery-api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./BreweryDetails.scss";

function BreweryDetails() {
  const params = useParams();
  const breweryId = params.breweryId.replace(":", "");
  //console.log(params.breweryId.replace(":", ""));
  const [brewery, setBrewery] = useState(null);

  const fetchBreweryById = async () => {
    try {
      const breweryDetails = await apiClient.getById(breweryId);
      //console.log(breweryDetails);
      setBrewery(breweryDetails);
    } catch (error) {
      console.log(`fetchBreweryById failed, ${error}`);
    }
  };

  useEffect(() => {
    fetchBreweryById();
  }, [breweryId]);

  // console.log(brewery)

  if (!brewery) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="page-wrap">

      
        <section className="details">
          <p>{brewery.name}</p>
          <p>Type: {brewery.brewery_type}</p>
          <p>{brewery.street}</p>
          <p> {brewery.city}</p>
          <p>Phone: {brewery.phone}</p>
          <p>
            <a className="link" href={brewery.website_url} target="_blank">{brewery.website_url}</a>
          </p>
          <Link to={"/"}>
            <button className="button">Back to Home</button>
          </Link>
        </section>

        </div>

      {/* <div className="background__mask"></div> */}
    </>
  );
}

export default BreweryDetails;
