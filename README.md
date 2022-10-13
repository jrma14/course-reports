# Course Reports App
Project Link: https://wpi-course-reports.vercel.app/

We created a course reports application which is used to view course report data.
Currently, WPI uses OSCAR to view this data but it is not very user friendly.
We added several features to the app to make it more user friendly and easier to use.

## Features
- **Search** - The user can search for a course by name or number
- **Filter** - The user can filter the results by term, subject
- **Course Overview** - The user can click on a course to view more details. Courses are aggregated by number to view course statistics for an entire course's history. Ex: All of Webware including past terms/years. Can view average GPA, average grade, average workload, average difficulty, and number of students per course. There are also graphs to help visualize the data.


## Technologies Used
- **SvelteKit** - We used SvelteKit to create the frontend of the application
- **PlanetScale** - We used PlanetScale to create the database for the application
- **Vercel** - We used Vercel to host the application
- **MySQL** - We used MySQL to create the database for the application
- **Chart.js** - We used Chart.js to create the graphs for the application
- **GitHub** - We used GitHub to manage our code
- **TailwindCSS** - We used TailwindCSS to style the application
- **DaisyUI** - We used DaisyUI to style the application
- **Figma** - We used Figma to create the mockups for the application

## Challenges
- **Learning SvelteKit** - We had to learn SvelteKit to create the frontend of the application
- **Learning MySQL** - We had to learn new SQL commands to effectively query the database
- **Learning Chart.js** - We had to learn to use Chart.js to create the graphs for the application
- **Data Gathering** - We had to gather the data for the application merging OSCAR and the WPI course catalog
- **Inserting Data** - We had to insert the data into the database into a format that would be easy to query. This required 3 tables: Courses, Course Overviews, and Professors.

## Contributions
### Michael
- Created the initial database for the application and populated it with data
- Implemented the database schemas
- Helped grab data from OSCAR and the WPI course catalog
- Made algorithms to merge the data from OSCAR and the WPI course catalog
- Made algorithms to aggregate data for the course overviews
- Helped refactor the db to use our new schemas and tables
- Figma Mockups

### Nathan
- Helped clean and parse the data from OSCAR and the WPI course catalog
- Helped import the new data into the database
- Made bar chart to view average rating per professor
- Made search bar for the course overview page
- Made pill buttons for the course overview page
- Helped refactor the db to use our new schemas and tables
- Figma Mockups

### Jacob
- Made algorithms to merge the data from OSCAR and the WPI course catalog
- Made sql queries to get the data for the tables
- Helped make the api endpoints for grabbing data from the database
- Made scatter chart to view average grade vs weekly workload per professor
- Made filter for the course overview page
- Helped refactor the db to use our new schemas and tables
- Figma Mockups

Video Link:
