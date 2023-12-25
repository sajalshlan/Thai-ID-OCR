## Overview

Started off with a simple OCR (Optical Character Recognition) application, initially using Tesseract.js for text extraction. However, faced accuracy issues, possibly due to the underlying model, leading to a shift to Google's Vision API.

The journey involved creating an account on Google Cloud Console, enabling billing, setting up a Service Account, and enabling the Vision API. Although the API provided accurate results, the real challenge was parsing the specific details we needed from the extracted text.

Experimented with traditional methods like slicing and trimming, but the lack of a universal rule made it challenging for different types of IDs. Each attempt was made in the /backend-vision/index.js file.

When seeking assistance to improve data extraction, the idea struck to explore the new Gemini engine, which incorporates visual training of data. Created a wrapper around Gemini-pro, fed it prompts for the desired information, and combined it with visual text extraction from IDs. This approach resulted in successful parsing and retrieval of the required data.

---

### Build and Run on your machine

##### Pre Requirements

Go to [Google AI Studios](https://makersuite.google.com/app/prompts/new_freeform) and create a new project on Google Cloud and get your API Keys.

### Flow

#### Client UI

• Client UI
working demo: https://thai-ocr-frontend-eta.vercel.app/

This is the page where users can upload their ID, and click on Get OCR and see the results there also. Also if they want to extract details of other IDs or extract again if they are not satisfied with the details. There t can see the details of the current ID as well as the previous results too.

• Admin Dashboard
working demo: https://thai-ocr-dashboard.vercel.app/

As the name suggests, this is the admin dashboard where we can get the records at [ ], where we can view, edit and delete any of them by clicking on the edit and delete icons.

• Backend
live at: https://thai-ocr-backend.onrender.com

1. This contains the backend logic for generating text from image using Gemini API (./indexVertex).
2. The endpoints that (./server.js) exposes for our admin to view, edit and delete ocr records.d

### Endpoints

#### User Service

| HTTP Method | URL                                                    | Description         |
| ----------- | ------------------------------------------------------ | ------------------- |
| `POST`      | https://thai-ocr-backend.onrender.com/createrecord     | Create new record   |
|             |
| `PUT`       | https://thai-ocr-backend.onrender.com/record/:recordId | Update Record by ID |
|             |
| `GET`       | https://thai-ocr-backend.onrender.com/records          | Get all records     |
|             |
| `DELETE`    | https://thai-ocr-backend.onrender.com/record/:recordId | Delete record by ID |
