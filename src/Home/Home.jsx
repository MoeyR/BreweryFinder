import { useEffect, useState } from "react";
import { apiClient } from "../utils/brewery-api";
import { Link } from "react-router-dom";



function Home(){
    const [breweries, setBreweries] = useState(null);
    const [searchBrewery, setSearchBrewery] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [showAllBreweries, setShowAllBreweries] = useState(false);
    
        const fetchBreweries = async () => {
          try {
            const breweriesList = await apiClient.getBreweries();
            //console.log(breweriesList)
            setBreweries(breweriesList);
            
          } catch (error) {
            console.log(`fetchBreweries failed, ${error}`);
          }
        };

    useEffect(() => {
        fetchBreweries();
      }, []);
      
      
      //console.log(breweries)

      if (!breweries || breweries.length === 0) {
        return <p>Loading...</p>;
    }
      
    
    const handleShowAllBreweries = () => {
        setShowAllBreweries(true);
        setSelectedOption('');
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    };

    const filteredBreweries = breweries.filter(brewery =>
        (brewery.city.toLowerCase().includes(searchBrewery) || searchBrewery === '') &&
        (selectedOption === '' || brewery.brewery_type === selectedOption)
    );


    return(
        <>
        <section className="header"><h1>Brewery Finder</h1></section>

        <section className="hero"></section>

        <section className="page-bottom-wrap">
            {/* -------------- Filters -------------- */}
            <section className="filter-section">
                <form>
                    <input className="search-bar" type="text" placeholder="Search by location..." onChange={e=>setSearchBrewery(e.target.value)}/>
                </form>
                
                <div>
                    <button className="show-all-button" onClick={handleShowAllBreweries}>All Breweries </button>
                </div>

                <div>
                    <select className="select-bar" value={selectedOption} onChange={handleSelectChange}>
                        <option value="">Select Type</option>
                        <option value="micro">micro</option>
                        <option value="brewpub">brewpub</option>
                        <option value="contract">contract</option>
                        <option value="closed">closed</option>
                    </select>
                </div>
            </section>
           
            {/* -------------- Cards -------------- */}
            <section className="cards-wrap">
                <ul className="card-ul">
                    {showAllBreweries ?
                    filteredBreweries.map((item) => (
                        <Link to={`/breweries/:${item.id}`} key={item.id}>
                            <li className="card-item">
                            <p> {item.name}</p>
                            <p>Type: {item.brewery_type}</p>
                            <p>{item.street}</p>
                            <p>City: {item.city}</p>
                            <p className="phone">Phone: {item.phone}</p>
                            {/* <p><a href={item.website_url} target="_blank">{item.website_url}</a></p> */}
                            <p className="link-button" onClick={() => openInNewTab(item.website_url)}>Go to Website</p>
                            </li>
                        </Link>
                    ))
                    :
                    filteredBreweries
                    .map((item)=>(
                        <Link to={`/breweries/:${item.id}`} key={item.id}>
                            <li className="card-item" key={item.id}>
                            <p>{item.name}</p>
                            <p>Type: {item.brewery_type}</p>
                            <p>{item.street}</p>
                            <p>City: {item.city}</p>
                            <p className="phone">Phone: {item.phone}</p>
                            {/* <a className="link-button" href={item.website_url} target="_blank" >Go to Website</a> */}
                            <p className="link-button" onClick={() => openInNewTab(item.website_url)}>Go to Website</p>
                            </li>
                        </Link>
                        
                        ))}
                </ul>
            </section>
            
        </section>
        </>
    )
}

export default Home;
