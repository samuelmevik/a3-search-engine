# A3 Search Engine

[![Version](https://img.shields.io/badge/version-1.0.50-blue.svg)](https://semver.org/)

A search engine for Wikipedia articles, leveraging algorithms to deliver the most relevant results quickly and efficiently.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Overview](#api-overview)
- [Acknowledgments](#acknowledgments)

## Introduction

The **A3 Search Engine** is a website designed to index and search through Wikipedia articles with high efficiency and accuracy. Implementing ranking algorithms, including PageRank, it ensures users receive the most relevant search results based on their queries.

![A3 Search Engine](./.readme\animation.gif)

This project fulfills all requirements up to Grade A, as specified in the assignment guidelines [assignment](https://coursepress.lnu.se/courses/web-intelligence/assignments/a3).

## Features

- **Comprehensive Indexing**: Indexes all pages in the provided Wikipedia dataset.
- **Flexible Search Queries**: Supports both single-word and multi-word search queries.
- **Advanced Ranking Algorithm**:
  ```
  score = word_frequency + 0.8 * document_location + 0.5 * pagerank
  ```
  - **Word Frequency**: Prioritizes pages where the search terms appear most frequently.
  - **Document Location**: Gives higher scores to pages where search terms appear earlier.
  - **PageRank**: Incorporates the importance of a page based on the PageRank algorithm, run over 20 iterations.
- **Top Results Display**: Shows the top five search results along with their page titles and rank scores.
- **RESTful Web Service**: Utilizes a REST API where the client sends search requests, and the server responds with HTML data.
- **User-Friendly Web Client**: Interactive GUI for inputting search queries and viewing results seamlessly.
- **Modern Styling**: Utilizes **HTMX** for dynamic content loading and **Tailwind CSS** for responsive and modern UI styling.

## Technologies Used

- **Elysia**: A fast and lightweight web framework.
- **Bun**: A blazing-fast JavaScript runtime.
- **TypeScript**: For strong typing and better code maintainability.
- **HTMX**: For handling dynamic content and enhancing user interactions without full page reloads.
- **Tailwind CSS**: For utility-first CSS styling, enabling rapid UI development.

## Installation

### Prerequisites

- **Bun**: Ensure you have Bun installed. [Get Bun here](https://bun.sh/).
- **Linux/macOS**: As of writing, the project has been tested on Linux and macOS. Running the application on Windows does not seem to work. The application starts successfully, but the search functionality does not work as expected.

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/a3-search-engine.git
   cd a3-search-engine
   ```

2. **Install Dependencies**
   ```bash
   bun install
   ```

## Usage

### Starting the Server

Run the server in development mode with hot reloading:

```bash
bun dev
```

### Accessing the Web Client

Open your preferred web browser and navigate to:

```
http://localhost:3000
```

### Performing Searches

- **Single-Word Queries**: Simply enter a single word to search for relevant Wikipedia articles.
- **Multi-Word Queries**: Enter multiple words to refine your search. The engine computes the score based on all terms.
- **Viewing Results**: The top five results will be displayed dynamically without full page reloads, thanks to HTMX. Each result shows the page title and its corresponding rank score.

## API Overview

### Endpoint

- **GET** `/api/search?q=your+search+terms`

### Response Format

The API responds with HTML content, which includes a table displaying the search results. This HTML is dynamically injected into the page using HTMX.

#### Example Request

```http
GET http://localhost:3000/api/search?q=hello
```

#### Example Response

```html
<table class="table-auto w-full">
    <tr>
        <th>Link</th>
        <th>Score</th>
        <th>Content</th>
        <th>Locatation</th>
        <th>PageRank</th>
    </tr>
    <tr class="text-center">
        <td class="text-left">
            <a class="text-blue-400" href="https://sv.wikipedia.org/wiki/International_Standard_Book_Number">International_Standard_Book_Number</a>
        </td>
        <td>1.3</td>
        <td>0</td>
        <td>0.8</td>
        <td>0.5</td>
    </tr>
    <tr class="text-center">
        <td class="text-left">
            <a class="text-blue-400" href="https://sv.wikipedia.org/wiki/Software_engineering">Software_engineering</a>
        </td>
        <td>1.23</td>
        <td>0</td>
        <td>0.8</td>
        <td>0.43</td>
    </tr>
    <tr class="text-center">
        <td class="text-left">
            <a class="text-blue-400" href="https://sv.wikipedia.org/wiki/Computer_science">Computer_science</a>
        </td>
        <td>1.18</td>
        <td>0</td>
        <td>0.8</td>
        <td>0.38</td>
    </tr>
</table>
<table>
    <tr>
        <th>count</th>
        <th>time</th>
    </tr>
    <tr>
        <td>641</td>
        <td>15ms</td>
    </tr>
</table>
```

### Explanation

- **Link**: The title of the Wikipedia article, linked to its detailed page.
- **Score Breakdown**:
  - **Score**: The total score calculated using the ranking algorithm.
  - **Content**: The word frequency score.
  - **Location**: The document location score.
  - **PageRank**: The PageRank score.
- **Count**: Total number of results found for the query.
- **Time**: The time taken to perform the search.

### Integration with HTMX

The web client uses HTMX to send asynchronous requests to the API endpoint without reloading the page. The server responds with HTML, which HTMX then injects into the DOM. This creates a smooth and responsive user experience.

## Acknowledgments

- **Wikipedia**: For providing the extensive dataset of articles.
- **Elysia Framework**: For enabling rapid development of the web service.
- **Bun Runtime**: For its performance and simplicity in running JavaScript applications.
- **HTMX**: For simplifying AJAX requests and dynamic content updates.
- **Tailwind CSS**: For its utility-first CSS framework that expedited the styling process.

---

*This project was developed as part of an assignment to implement a basic search engine with ranking features.*