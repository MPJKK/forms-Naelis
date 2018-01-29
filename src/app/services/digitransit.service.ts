import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class DigitransitService {

    apiUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
    pysakki = 'Gransinmäki';
    lat: number;
    lon: number;


    constructor(private http: HttpClient) {
    }

    getRoutes(temp) {
        const body = `{
                    stops(name: "${temp}") {
                      name
                      lat
                      lon
                      patterns {
                        name
                        route {
                          shortName
                          longName
                        }
                        directionId
                      }
                    }
                  }`;
        const headers = {
            headers: new HttpHeaders().set('Content-type', 'application/graphql'),
        };

        interface RouteData {
            data: Object;
        }

        return this.http.post<RouteData>(this.apiUrl, body, headers);
    }

}