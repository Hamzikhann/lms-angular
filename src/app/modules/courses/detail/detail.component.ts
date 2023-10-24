import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  course: any;
  instructor: any;
  books: any;
  files: any;
  links: any;
  faqs: any;
  index: any;
  sections: any = {
    about: true,
    index: false,
    files: false,
    books: false,
    links: false,
    faqs: false,
  }

  constructor() { }

  ngOnInit(): void {
    this.course = {
      title: 'Statistics and Probability',
      code: 'STA 301',
      category: 'Mathematics',
      summary: 'Starting with the basic concepts of data and its types, the course Sta301 introduces the various methods and procedures of collecting, organizing, summarizing, presenting and analyzing the data. ',
      about: 'Starting with the basic concepts of data and its types, the course Sta301 introduces the various methods and procedures of collecting, organizing, summarizing, presenting and analyzing the data. The regression and correlation analysis is used to evaluate the relationship between two or more variables. The second portion of the course focuses on the probability theory. From the basic probability rules to the construction of all the well-known probability distributions like binomial, hypergeometric, uniform and normal distributions are discussed in this part. The course will finally introduce the inferential statistics which is further divided into estimation and hypothesis testing. It deals with the drawing of conclusions about various phenomena on the basis of real data collected on sample basis. The use of appropriate methods like Z-test, T-test, F-test, Chi-square test and ANOVA are explained with examples.',
      learn: {
        content: 'At the end of the course, you should be able to understand:',
        list: [
          "Different meanings of statistics and data types",
          "A variety of methods for collecting, presenting and summarizing data",
          "Methodologies for regression and correlation analysis for future perditions",
          "Basic concepts and rules of probability along with important probability distributions",
          "Sampling concept, its types and techniques",
          "Estimating and hypothesis testing using main distributions",
          "Usage of Analysis-of-variance and experimental design",
          "Fundamental level of skills for basic statistical computing using Calculator / Excel / Math type etc.",
          "How to communicate to others the importance and relevance of statistics in the modern world",
          "How to be an independent learner, able to acquire further knowledge with little guidance or support.",
        ]
      }
    }
    this.instructor = {
      name: "Dr. Saleha Naghmi",
      qualification: "PhD.",
      institute: "National College of Business Administration and Economics (NCBA&E)",
      image: "/assets/images/people/50/woman-6.jpg",
      email: "farwa.amin@vu.edu.pk ",
      bio: "I give personalized attention to all my students and success is a guarantee as per their dedication, .. My method of tutoring is based on jolly Phonics for kindergarten which involves having interactive sessions with them."
    }
    this.books = [
      {
        title: "Introduction to Statistical Theory (Part I and II)",
        author: "Prof.Sher Mouhammad Chaudhry and Dr.Shahid Kamal",
        edition: "2nd",
        publisher: "Ilmi Kitaab Khana, Lahore, Pakistan",
      }, 
      {
        title: "Statistics Theory and Methods",
        author: "Afzal Beg and Miraj Din Mirza",
        edition: "1st",
        publisher: "Caravan Book House, Lahore, Pakistan",
      }, 
      {
        title: "Polymer basics Statistics",
        author: "Mohammad Rauf Chaudhry",
        edition: "1st",
        publisher: "Polymer Publication",
      }, 
      {
        title: "Business Statistics for Management and Economics",
        author: "Wayne W. Daniel and James C. Terrell",
        edition: "7th",
        publisher: "Houghton Mifflin Company, USA",
      }, 
      {
        title: "Probability & Statistical Inference",
        author: "Robert V. Hogg & Elliot A. Tanis",
        edition: "7th",
        publisher: "Dorling Kindersley (India) Pvt. Ltd, licences of Peasrson Education in south asia",
      }
    ];
    this.files = [
      { title: "Binomial Distribution", time: "12 minutes ago" }, 
      { title: "How to take Pwer in Math Type", time: "2 days ago" }, 
      { title: "Uniform Distribution ", time: "1 week" }, 
      { title: "The value of constant 'e'", time: "1 month ago" }, 
      { title: "Mean and Varaince", time: "8 months ago" }, 
      { title: "Population Mean", time: "1 year ago" }, 
    ]
    this.links = [
      {
        title: "Statistics Glossary",
        url: "http://www.stats.gla.ac.uk/steps/glossary/alphabet.html"
      }, 
      {
        title: "Box and Whisker",
        url: "http://vulms.vu.edu.pk/Courses/STA301/Downloads/Box%20and%20whisker%20plot.mp4"
      }, 
      {
        title: "Glossary of Statistical terms",
        url: "http://www.statistics.com/glossary/"
      }, 
      {
        title: "Data",
        url: "http://www.mathsisfun.com/data/"
      }, 
      {
        title: "Tally Marks",
        url: "http://www.mathsisfun.com/data/tally-marks.html"
      }, 
      {
        title: "Dot Plot",
        url: "http://vulms.vu.edu.pk/Courses/STA301/Downloads/Dot%20Plot%20-%20How%20to%20create%20it%20by%20hand.pdf"
      }, 
      {
        title: "Box & Whisker",
        url: "http://vulms.vu.edu.pk/Courses/STA301/Downloads/bosx%20and%20whisker%20plot.docx"
      }, 
      {
        title: "Histrogram",
        url: "http://vulms.vu.edu.pk/Courses/STA301/Downloads/Histogram%20and%20polygon%20in%20excel.avi"
      }, 
      {
        title: "Permutation and combination",
        url: "http://vulms.vu.edu.pk/Courses/STA301/Downloads/permutation%20and%20combination.pdf"
      }, 
      {
        title: "How to install team viewer session",
        url: "http://vulms.vu.edu.pk/Courses/STA301/Downloads/TeamViewer%20Meeting%20client%20side.pdf"
      }
    ]
    this.faqs = [
      {
        title: "What is meant by A true zero point in a ratio scale?",
        content: "A value of zero does not mean the total absence of the variable under study. e.g A 0 degree temperature does not mean that there is no temperature.",
      },
      {
        title: "What are the fractiles?",
        content: "A fractile is that point below which a stated fraction (or decimal equilvalence) of the values lie. A fractile and a percentile is same.",
      },
      {
        title: "What the effect will occure in the result of mean, median, mode, varience, and standred deviation if we add or subtract a number from the data?",
        content: "Mean is not effected by change of origion(addition or subtraction of any no) and change of scale(multiplication or dividion of any no) but variance is effected by change of origion and scale.with change of origion it will remain unchanged i-e v(X+Y)=v(X)+v(Y) or v(X-Y)=v(X)+v(Y) and when one number is multiplied or divided then it will become double.i-e v(5X)=25v(X) or v(1/5x)=1/25v(X)",
      },
      {
        title: "What is practical importances of median and quartile or in which cases these comodities are used?",
        content: "Median is one of the measure of central location. It is good to use the median when a frequency distribution involves 'open end' classes like those of income and prices. In a highly skewed distribution, median is an appropriate average to use as it is not affected by extreme values. It can be located when the values are not capable of quantitative measurement. While quartiles are used when the same nature of data is to be dealt with but they are used to divide the data into four equal parts.",
      },
      {
        title: "What is the important of relation between Arithmetic, Geometric and harmonic?",
        content: "Relation between arithmetic mean, geometric mean and harmonic mean is given below: Arithmetic Mean > Geometric Mean >Harmonic Mean I.e. for a data arithmetic mean is greater than geometric mean and harmonic mean. And geometric mean is greater than harmonic mean.",
      },
      { 
        title: "State what is Grouped and Row data?",
        content: "Grouped data The data presented in the form of frequency distribution is also known as grouped data. Raw data Data that have not been processed in any manner. It often refers to uncompressed text that is not stored in any priority format. It may also refer to recently captured data that may have been placed into a database structure, but not yet processed.",
      },
      {
        title: "How will decide number of classes and class interval for the given data?",
        content: "There are no hard and fast rules for deciding on the number of classes which actually depends on the size of data. Statistical experience tells us that no less than 5 and no more than 20 classes are generally used. Use of too many classes will defeat the purpose of condensation and too few will result in too much loss of information. Deciding on the number of classes does not depend on the value of range. In the given example no. of classes was chosen 8. It is chosen with respect the size of data. It is not decided after seeing the value of range which is 1.38 in this example. To find class interval ‘h’ we should first find the range and divide it by number of classes",
      }
    ];
    this.index = [
      {
        id: 1,
        title: 'Introduction',
        content: [
          {
            id: 1,
            type: 'lecture',
            title: 'Course Overview',
            status: 'open',
            time: '36m 10s'
          }, 
          {
            id: 2,
            type: 'lecture',
            title: 'Recommended Books, FAQs, Files Access & Grading Scheme Overview',
            status: 'open',
            time: '12m 32s'
          }
        ]
      }, 
      {
        id: 2,
        title: 'Week 01',
        content: [
          {
            id: 2,
            type: 'lecture',
            title: 'The Central Tendency of a data-set',
            status: 'open',
            time: '54m 37s'
          }, {
            id: 3,
            type: 'lecture',
            title: 'Geometric mean,Harmonic mean & relationship between them',
            status: 'open',
            time: '12m 10s'
          }, {
            id: 4,
            type: 'lecture',
            title: 'Measures of Dispersion',
            status: 'open',
            time: '50m 13s'
          }, {
            id: 5,
            type: 'assessment',
            title: 'Assignment: Mean Deviation, Standard Deviation and Variance & Coefficient of variation',
            status: 'open',
            time: ''
          }, 
        ]
      }, 
      {
        id: 3,
        title: 'Week 02',
        content: [
          {
            id: 6,
            type: 'lecture',
            title: 'Box and Whisker Plot,Pearson’s Coefficient of Skewness',
            status: 'open',
            time: '54m 37s'
          }, {
            id: 7,
            type: 'lecture',
            title: 'Set Theory, Counting Rules',
            status: 'open',
            time: '12m 10s'
          },
        ]
      }, 
      {
        id: 4,
        title: 'Week 03',
        content: [
          {
            id: 8,
            type: 'lecture',
            title: 'Permutations, Combinations',
            status: 'open',
            time: '50m 13s'
          }, {
            id: 9,
            type: 'assessment',
            title: 'Quiz: Set Theory, Counting Rules',
            status: 'closed',
            time: ''
          }, 
        ]
      }, 
      {
        id: 5,
        title: 'Week 04',
        content: [
          {
            id: 10,
            type: 'lecture',
            title: 'Continuous Probability Distribution ,Bivariate Probability Distribution',
            status: 'closed',
            time: '54m 37s'
          }, {
            id: 11,
            type: 'lecture',
            title: 'Geometric mean,Harmonic mean & relationship between them',
            status: 'closed',
            time: '12m 10s'
          }, {
            id: 12,
            type: 'lecture',
            title: 'Measures of Dispersion',
            status: 'closed',
            time: '50m 13s'
          },
        ]
      }, 
      {
        id: 6,
        title: 'Week 05',
        content: [
          {
            id: 13,
            type: 'lecture',
            title: 'The Central Tendency of a data-set',
            status: 'closed',
            time: '54m 37s'
          }, {
            id: 14,
            type: 'lecture',
            title: 'Geometric mean,Harmonic mean & relationship between them',
            status: 'closed',
            time: '12m 10s'
          }, {
            id: 15,
            type: 'lecture',
            title: 'Measures of Dispersion',
            status: 'closed',
            time: '50m 13s'
          }, {
            id: 16,
            type: 'lecture',
            title: 'Mean Deviation, Standard Deviation and Variance & Coefficient of variation',
            status: 'closed',
            time: '8m 42s'
          }, 
        ]
      }, 
      
    ]
  }

  toggleSection(name: string) {
    this.sections = {
      about: false,
      index: false,
      files: false,
      books: false,
      links: false,
      faqs: false,
    }
    this.sections[name] = true;
  }

}
