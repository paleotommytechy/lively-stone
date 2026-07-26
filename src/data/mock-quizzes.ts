import { Quiz } from '../types';

export const initialQuizzes: Quiz[] = [
  {
    id: 'q-101',
    teachingId: 't-101',
    title: 'The Pattern of Kingdom Multiplication Quiz',
    description: 'Test your understanding of apostolic multiplication and Paul’s ministry model in the School of Tyrannus (Acts 19:8-10).',
    passingScore: 75,
    timeLimitMinutes: 10,
    questions: [
      {
        id: 'q1-1',
        question: 'Where did Apostle Paul hold daily discussions for two years in Ephesus?',
        options: [
          'The Jewish Synagogue',
          'The Lecture Hall of Tyrannus',
          'The Market Square',
          'The Temple of Artemis'
        ],
        correctOptionIndex: 1,
        explanation: 'Acts 19:9 states that Paul had discussions daily in the lecture hall of Tyrannus after leaving the synagogue.'
      },
      {
        id: 'q1-2',
        question: 'According to Acts 19:10, what was the territorial outcome of daily instruction in Tyrannus?',
        options: [
          'Only a few local leaders were trained',
          'A new building was erected in Ephesus',
          'All the Jews and Greeks in the province of Asia heard the word of the Lord',
          'Paul was immediately arrested by Roman authorities'
        ],
        correctOptionIndex: 2,
        explanation: 'The persistent daily discipleship resulted in the entire province of Asia hearing the gospel message.'
      },
      {
        id: 'q1-3',
        question: 'In 2 Timothy 2:2, what key principle of discipleship does Paul pass on to Timothy?',
        options: [
          'Building large physical structures for worship',
          'Entrusting truth to reliable people qualified to teach others',
          'Writing written letters to secular rulers',
          'Preaching only on traditional sabbath days'
        ],
        correctOptionIndex: 1,
        explanation: '2 Timothy 2:2 outlines 4 generations of discipleship: Paul -> Timothy -> Reliable People -> Others.'
      },
      {
        id: 'q1-4',
        question: 'What is the ultimate goal of the School of Tyrannus discipleship vision?',
        options: [
          'Academic accreditation',
          'Personal religious pride',
          'Multiplying disrobed disciples who impact their spheres of influence',
          'Hosting social events'
        ],
        correctOptionIndex: 2,
        explanation: 'The School of Tyrannus equips believers through Learn -> Grow -> Live -> Serve -> Disciple -> Multiply.'
      }
    ]
  },
  {
    id: 'q-102',
    teachingId: 't-102',
    title: 'Foundations of Living the Word Quiz',
    description: 'Assess your grasp on practical holiness and active obedience to God’s Word.',
    passingScore: 80,
    timeLimitMinutes: 8,
    questions: [
      {
        id: 'q2-1',
        question: 'According to James 1:22, what happens when a believer only hears the Word without doing it?',
        options: [
          'They gain deep wisdom',
          'They deceive themselves',
          'They earn double blessings',
          'They become apostles automatically'
        ],
        correctOptionIndex: 1,
        explanation: 'James 1:22 explicitly warns that hearing without doing leads to self-deception.'
      },
      {
        id: 'q2-2',
        question: 'Where is practical holiness primarily demonstrated in a disciple’s life?',
        options: [
          'Only during church services',
          'In public marketplace choices, private habits, and speech',
          'In isolated desert retreats exclusively',
          'Through social media posts only'
        ],
        correctOptionIndex: 1,
        explanation: 'Living the Word manifests in everyday decisions, integrity, and daily obedience.'
      }
    ]
  }
];
