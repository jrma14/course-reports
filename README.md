# Final Project
*Due October 13th (final day of the term)*

For your final project, you'll implement a web application that exhibits understanding of the course materials. 
This project should provide an opportunity to both be creative and to pursue individual research and learning goals.

## General description
Your project should consist of a complete Web application, exhibiting facets of the three main sections of the course material:

- Static web page content and design. You should have a project that is accessible, easily navigable, and features significant content.
- Dynamic behavior implemented with JavaScript (TypeScript is also allowed if your group wants to explore it).
- Server-side programming *using Node.js*. Typically this will take the form of some sort of persistent data (database), authentication, and possibly server-side computation. 
- A video (less than five minutes) where each group member explains some aspect of the project. An easy way to produce this video is for you all the groups members to join a Zoom call that is recorded; each member can share their screen when they discuss the project or one member can "drive" the interface while other members narrate (this second option will probably work better.) The video should be posted on YouTube or some other accessible video hosting service. Make sure your video is less than five minutes, but long enough to successfully  explain your project and show it in action. There is no minimum video length.

## Project ideation
Excellent projects typically serve someone/some group; for this assignment you need to define your users and stakeholders. I encourage you to identify projects that will have impact, either artistically, politically, or in terms of productivity. 

### Deliverables

#### Form Team (due 9/25)
Students are will work in teams of 3-5 students for the project; teams of two can be approved with the permission of the instructor. Working in teams should help enable you to build a good project in a limited amount of time.  Use the `#project-logistics` channel in Discord to pitch ideas for final projects and/or find fellow team members as needed.

Teams must be in place by end of day on Sunday, September 25th. If you have not identified a team at this point, you will be assigned a team. You will be given some class time on Monday to work on your proposal, but please plan on reserving additional time outside of class as needed.

#### Proposal (due 9/27) 
Provide an outline of your project direction and the names of associated team members. 
The outline should have enough detail so that staff can determine if it meets the minimum expectations, or if it goes too far to be reasonable by the deadline. Please include a general description of a project, and list of key technologies/libraries you plan on using (e.g. React, Three.js, Svelte, TypeScript etc.). Two to four paragraps should provide enough level of detail. Name the file proposal.md and submit a pull request by Tuesday, September 27th at 11:59 PM (end of day). Only one pull request is required per team.

There are no other scheduled checkpoints for your project. 

#### Turning in Your Project
Submit a second PR on the final project repo to turn in your app and code. Again, only one pull request per team.

Deploy your app, in the form of a webpage, to Glitch/Heroku/Digital Ocean or some other service; it is critical that the application functions correctly wherever you post it.

The README for your second pull request doesn’t need to be a formal report, but it should contain:

1. A brief description of what you created, and a link to the project itself (two paragraphs of text)
2. Any additional instructions that might be needed to fully use your project (login information etc.)
3. An outline of the technologies you used and how you used them.
4. What challenges you faced in completing the project.
5. What each group member was responsible for designing / developing.
6. A link to your project video.

Think of 1,3, and 4 in particular in a similar vein to the design / tech achievements for A1—A4… make a case for why what you did was challenging and why your implementation deserves a grade of 100%.

## FAQs

- **Can I use XYZ framework?** You can use any web-based frameworks or tools available, but for your server programming you need to use Node.js. Your client-side scripting language should be either JavaScript or TypeScript.

# Course Reports App
Project Link: https://wpi-course-reports.vercel.app/

We created a course reports application which is used to view course report data.
Currently, WPI uses [OSCAR](https://oscar.wpi.edu/) to view this data but it is not very user friendly.
We added several features to the app to make it more user friendly and easier to use.

## Features
- **Search** - The user can search for a course by name or number
- **Filter** - The user can filter the results by term, subject
- **Course Overview** - The user can click on a course to view more details. Courses are aggregated by number to view course statistics for an entire course's history. Ex: All of Webware including past terms/years. Can view average GPA, average grade, average workload, average difficulty, and number of students per course. There are also graphs to help visualize the data.


## Technologies Used
- **SvelteKit** - We used SvelteKit to create the frontend of the application
- **PlanetScale** - We used PlanetScale to host the MySQL database for the application
- **Vercel** - We used Vercel to host the application
- **MySQL** - We used MySQL the database for the application
- **Chart.js** - We used Chart.js to create the graphs for the application
- **GitHub** - We used GitHub to manage our code
- **TailwindCSS** - We used TailwindCSS to style the application
- **DaisyUI** - We used DaisyUI to provided prebuild components
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