import React from "react";
import "./Resume.css";

function Resume() {
  return (
    <div className="resume-container">
      <div className="header">
        <h1>FORHEEN AHMED</h1>
        <p>Bengaluru, Karnataka, India</p>
        <p>
          <a href="mailto:forheen2017@gmail.com">forheen2017@gmail.com</a> | 
          <a href="tel:+918720962751"> +91-8720962751</a> | 
          <a href="https://www.linkedin.com/in/forheen-ahmed/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </p>
      </div>

      <section className="skills">
        <h2>SKILLS</h2>
        <ul>
          <li><strong>Programming Languages:</strong> Java (Advanced), Python, Kotlin, Dart, PHP, JavaScript (React.js, Node.js, Express.js, Angular.js), C, C++</li>
          <li><strong>Web Development:</strong> HTML, CSS, UML/XML, React.js, Vue.js, Bootstrap, React Native, MERN Stack, WordPress</li>
          <li><strong>Databases:</strong> MongoDB, MySQL, Firebase</li>
          <li><strong>Mobile Development:</strong> Android (Java, Jetpack Compose UI), Flutter</li>
          <li><strong>Additional:</strong> TensorFlow, OpenCV, Tableau, Processing, NetBeans, Eclipse, Android Studio, MATLAB, GitHub, LaTeX, Asana, Jira, SDLC, Agile Development, CI/CD (Jenkins, Postman)</li>
        </ul>
      </section>

      <section className="experience">
        <h2>EXPERIENCE</h2>
        <h3>Drishtee Foundation</h3>
        <p><strong>Software Development Engineer (SDE) – Full-time</strong> (06/2024 – Present)</p>
        <ul>
          <li>Led backend development for secure, efficient APIs, reducing transaction times by 20% through AEPS biometric integration.</li>
          <li>Migrated PHP to Node.js, boosting performance by 30%, and rewrote Android Java code in React Native for cross-platform compatibility.</li>
          <li>Implemented machine learning for document verification, cutting verification time by 30% and reducing bugs by 25%.</li>
          <li>Delivered technical leadership on key projects, advancing Drishtee Foundation’s mission to empower rural communities.</li>
        </ul>

        <h3>North East Renewable Energy Research Lab, Assam, India</h3>
        <p><strong>Student Research Intern</strong> (05/2022 – 01/2023)</p>
        <ul>
          <li>Developed a Dual Axis Solar Tracker with IoT, increasing energy output by 15%, optimized for Northeast India solar conditions.</li>
        </ul>

        <h3>IIM Ahmedabad</h3>
        <p><strong>Summer Intern</strong> (09/2021 – 11/2021)</p>
        <ul>
          <li>Analyzed Kaggle datasets to identify price trends, resulting in actionable insights for pricing strategies that increased market positioning by 15%.</li>
          <li>Visualized IPL player stats, improving selection analysis by 20% using Processing.</li>
        </ul>
      </section>

      <section className="projects">
        <h2>PROJECTS</h2>
        <p>
          <strong>Job Marker Extension</strong> - Improved job application tracking across 100+ websites by 30%.{" "}
          <a href="https://www.linkedin.com/posts/forheen-ahmed_webdevelopment-chromeextension-jobsearch-activity-7148605775244894208-ZXkT/?utm_source=share&utm_medium=member_desktop" target="_blank" rel="noopener noreferrer">
            Click here
          </a>
        </p>
        <p>
          <strong>YAWAN – Android Bus Tracking App</strong> - Created a live bus location tracking application with Google Maps API.
        </p>
        <p>
          <strong>Aashroy</strong> - Full-Stack crime reporting platform with features like photo uploads, map-based searches, and data analysis.{" "}
          <a href="https://www.youtube.com/watch?v=CkIZjPl_J8w" target="_blank" rel="noopener noreferrer">
            Click here
          </a>
        </p>
      </section>

      <section className="awards">
        <h2>AWARDS</h2>
        <ul>
          <li>National Child Award for Exceptional Achievement, 2004</li>
          <li>World’s Youngest Sun Certified Java Programmer, 2008</li>
          <li>Winner of Dr. Madhab Chandra Bora Memorial Hackathon, 2021</li>
          <li>India Book of Records, 2021 - "Maximum LinkedIn posts by an individual in one day"</li>
        </ul>
      </section>

      <section className="additional">
        <h2>ADDITIONAL</h2>
        <ul>
          <li>Founder of DCODE, JEC - Conducted programming workshops for over 200 students.</li>
          <li>Android Development Lead at Google Developer Students Club, JEC - Achieved Tier-I status in GDSC Compose Camp competition.</li>
        </ul>
      </section>

      <section className="scholarships">
        <h2>SCHOLARSHIPS</h2>
        <ul>
          <li>Ishan Uday Scholarship (2020-2024): ₹75,000 annually for four years.</li>
          <li>Assam AHSEC Scholarship, 2019: Scooter award for academic excellence.</li>
          <li>Arunodoi Merit Scholarship, 2017: Recognized for academic excellence at the 10th-grade level.</li>
        </ul>
      </section>
      
      <section className="education">
        <h2>EDUCATION</h2>
        <p>
          <strong>Bachelor of Technology in Instrumentation Engineering</strong> (2020-2024)
          <br />
          Jorhat Engineering College, Jorhat, Assam
          <br />
          Score: 83.20% | Assam Science and Technology University (ASTU)
        </p>
      </section>

      <div className="footer">
        <p>Updated on 21-10-2024</p>
      </div>
    </div>
  );
}

export default Resume;
