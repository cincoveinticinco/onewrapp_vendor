import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadS3Service {

  getPresignedPutURL(filename: string, folder: string, extraParams?: any): Observable<any> {
		let params = {
			'filename': filename,
			'vendor_id': folder
		};
		if (extraParams) {
			params = Object.assign(params, extraParams);
		}
		return this.http
			.post(`${environment.API_URL}finance/getPresignedUrlService`, params)
			.pipe(map(response => response));
	}

  getPresignedUrl(filename: string, folder: string, urlRequest: string, extraParams?:any): Observable<any> {
		let params = {
			'filename': filename,
			'vendor_id': folder
		};
		if (extraParams) {
			params = Object.assign(params, extraParams);
		}
		return this.http
			.post(environment.API_URL + urlRequest, params)
			.pipe(map(response => response));
	}

  uploadFileUrlPresigned(file: any, uploadUrl: string, contentType:string): Observable<any> {

		const headers = new HttpHeaders({'Content-Type': contentType, 'Accept': '*/*'});
		const req = new HttpRequest(
			'PUT', uploadUrl, file, {
			headers: headers
		}
		);
    console.log(req)
		return this.http.request(req);
	}

  uploadFileUrlPresignedWithProgress(file: File, url: string, key:string): Observable<any>{
		return this.progressExternalUpload(file, url, key);
	}

  private progressExternalUpload(file:File, url:string, nameFile:string): Observable<any> {
		return new Observable((observer) => {
			var xhr = new XMLHttpRequest();
			xhr.addEventListener('progress', function (e: any) {
				const done = e.position || e.loaded, total = e.totalSize || e.total;
				observer.next({ done: false, progress: Math.floor(done / total * 1000) / 10, key: nameFile });
			}, false);


			if (xhr.upload) {
				xhr.upload.onprogress = function (e: any) {
					var done = e.position || e.loaded, total = e.totalSize || e.total;
					observer.next({ done: false, progress: Math.floor(done / total * 1000) / 10, key: nameFile });
				};
			}
			xhr.onreadystatechange = function (e) {
				if (4 == this.readyState) {
					observer.next({ done: true, progress: 100, key: nameFile });
					observer.complete();
				}
			};
			xhr.open('put', url, true);
			xhr.setRequestHeader("Content-Type", file.type);
			xhr.send( file);
		}).pipe(map(response => response));

	}

  removeAccents(strAccents: string) {
		return strAccents.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
	}

	getFileNameAdjusted(file: File) {
		let ext = file['name'].split('.')[file['name'].split('.').length - 1];
		let name = this.removeAccents(file['name'].replace(/\.[^/.]+$/g, "").replace(/\s/g, "_") + Date.now() + '.' + ext);
		return name;
	}



  constructor(private http: HttpClient) { }
}
