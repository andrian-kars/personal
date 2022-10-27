import cvDocument from 'public/assets/andrian-kars-cv.pdf';

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
  'about.education.5.time': '2020',
  'about.education.6': 'OSF Academy',
  'about.education.6.description': 'Trainee Front-End Developer',
  'about.education.6.time': '2020',
  'about.education.7': 'WebCademy',
  'about.education.7.description': 'HTML Coder',
  'about.education.7.time': '2019',
  'about.education.8': 'High School in Germany',
  'about.education.8.description': 'Associate Degree in Economics',
  'about.education.8.time': '2016 - 2018',
  // experienceInfo
  'about.experience.1': 'EPAM Systems',
  'about.experience.1.description':
    'Optimization of pipelines for faster builds. Reducing "webpack build" from 40 to 15-18 seconds. \n Application architecture creation. Refactoring already written code to use Redux, the connection of architecture levels, implementation of patterns. \n Reusable, optimized and clean components creation. \n Reordering the folder structure for easier understanding and navigation. \n Optimization of the application to load it quicker. When the app was starting, it had nine renders. After implementing my ideas, the number is one. \n To see more read my CV',
  'about.experience.1.time': 'Feb. 2021 – Till Now',
  'about.experience.1.textToMakeLink': 'CV',
  'about.experience.1.url': cvDocument,
  'about.experience.2': 'Uni. Project',
  'about.experience.2.description':
    'I was the leader of a University team of four. We had a timeId of six months to get the project done. We did it in four. Later our work was reviewed by the GlobalLogic Engineers. Our achievement is a first place among all the other groups',
  'about.experience.2.time': 'Dec. 2020 - Feb. 2021',
  'about.experience.2.textToMakeLink': 'GlobalLogic',
  'about.experience.2.url': 'https://www.globallogic.com/',
  'about.experience.3': 'OSF Academy',
  'about.experience.3.description':
    'Challenged with ten other developers to complete a project. Completed the project weeks before the deadline and came up at the top. In the end, I was offered a position at OSF Digital',
  'about.experience.3.time': 'Aug. 2020 - Dec. 2020',
  'about.experience.3.textToMakeLink': 'OSF Digital',
  'about.experience.3.url': 'https://osf.digital/',
  'about.experience.4': 'HTML Coding',
  'about.experience.4.description':
    'Created lots of websites using HTML/SCSS, from simple landing pages to animated pages with demanding logic',
  'about.experience.4.time': 'Mar. 2019 - Aug. 2020',
});
