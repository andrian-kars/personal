import cvDocument from 'src/assets/andrian-kars-cv.pdf';

const currentYear = new Date().getFullYear();

export const about = Object.freeze({
  'about.title.about': 'Me, Myself & I',
  'about.title.education': 'Education',
  'about.title.experience': 'Experience',
  // aboutInfo
  years: 'years',
  location: "L'viv, Ukraine",
  'about.name': 'Name',
  'about.age': 'Age',
  'about.age.description': `${currentYear - 2001} years`,
  'about.experience': 'Experience',
  'about.experience.description': `${currentYear - 2019} years`,
  'about.location': 'Location',
  'about.socials': 'LinkedIn & GitHub',
  'about.socials.description': '/andrian-kars',
  // educationInfo
  'about.education.1': 'EPAM Senior SE Growth',
  'about.education.1.description': 'Senior Software Engineering',
  'about.education.1.time': '2022',
  'about.education.2': 'Ivan Franko University',
  'about.education.2.description': 'Software Engineering',
  'about.education.2.time': '2020 - 2022',
  'about.education.3': 'EPAM Front-End Winter',
  'about.education.3.description': 'Strong Junior Front-End Engineer',
  'about.education.3.time': '2021',
  'about.education.4': 'React Way Of Samurai',
  'about.education.4.description': 'Junior Front-End Engineer',
  'about.education.4.time': '2020',
  'about.education.5': 'JavaScript 30',
  'about.education.5.description': 'JavaScript quirks and features',
  'about.education.5.time': '2019',
  'about.education.6': 'High School in Germany',
  'about.education.6.description': 'Associate Degree in Economics',
  'about.education.6.time': '2016 - 2018',
  // experienceInfo
  'about.experience.1': 'EPAM Systems',
  'about.experience.1.description':
    'Optimization of pipelines for faster builds. Reducing "webpack build" from 40 to 15-18 seconds. \n Application architecture creation. Refactoring already written code to use Redux, the connection of architecture levels, implementation of patterns. \n Reusable, optimized and clean components creation. \n Reordering the folder structure for easier understanding and navigation. \n Optimization of the application to load it quicker. When the app was starting, it had nine renders. After implementing my ideas, the number is one. \n To see more read my CV',
  'about.experience.1.time': 'Feb. 2021 – Till Now',
  'about.experience.1.textToMakeLink': 'CV',
  'about.experience.1.url': cvDocument,
  'about.experience.2': 'Freelance',
  'about.experience.2.description':
    'Daily communication with customers to fulfil their business requirements. \n Working with experienced engineers to develop complex React applications. \n Creating API endpoints with authorization. \n Development of several React applications from scratch to deployment. \n SEO optimization of HTML pages and React apps. \n Transforming HTML Coding template into WordPress theme. \n Developing modern HTML Coding websites, making them browser and device agnostic. \n',
  'about.experience.2.time': 'Mar. 2019 - Feb. 2021',
});
