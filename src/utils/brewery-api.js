import axios from "axios";

class BreweryApi{
    constructor(){
        this.baseUrl = "https://api.openbrewerydb.org/v1";
    }


    async getBreweries(){
        try {
            const response = await axios.get(
                `${this.baseUrl}/breweries`);
                return response.data;
        } catch (error) {
            console.log(`GET Breweries request failed, ${error}`);
        }
    }

    async getById(id){
        try {
            const response = await axios.get(
                `${this.baseUrl}/breweries/${id}`);
                return response.data;
        } catch (error) {
            console.log(`GET getByCity request failed, ${error}`);
        }
    }

    async getByCity(cityName){
        try {
            const response = await axios.get(
                `${this.baseUrl}/breweries?by_city=${cityName}`);
                return response.data;
        } catch (error) {
            console.log(`GET getByCity request failed, ${error}`);
        }
    }

    async getByType(type){
        try {
            const response = await axios.get(
                `${this.baseUrl}/breweries?by_type=${type}`);
                return response.data;
        } catch (error) {
            console.log(`GET getByType request failed, ${error}`);
        }
    }

}

const apiClient = new BreweryApi();

export {apiClient};