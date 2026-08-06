import { useApp } from '../context/AppContext';
import { Teaching, StudentProfile, CommunityPost, StudentQuestion, MinistryEvent } from '../types';

export interface SearchResults {
  teachings: Teaching[];
  students: StudentProfile[];
  posts: CommunityPost[];
  questions: StudentQuestion[];
  events: MinistryEvent[];
  totalResults: number;
}

export const useGlobalSearch = (query: string): SearchResults => {
  const { teachings, studentsList, communityPosts, questions, events } = useApp();
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    return {
      teachings: [],
      students: [],
      posts: [],
      questions: [],
      events: [],
      totalResults: 0,
    };
  }

  // 1. Search Teachings
  const matchedTeachings = teachings.filter(t => 
    t.title.toLowerCase().includes(trimmed) ||
    t.summary.toLowerCase().includes(trimmed) ||
    t.topic.toLowerCase().includes(trimmed) ||
    t.speaker.toLowerCase().includes(trimmed) ||
    t.pillar.toLowerCase().includes(trimmed) ||
    (t.scriptures && t.scriptures.some(s => 
      s.book.toLowerCase().includes(trimmed) || 
      s.verse.toLowerCase().includes(trimmed) || 
      s.text.toLowerCase().includes(trimmed)
    ))
  );

  // 2. Search Students (for admin/portal management)
  const matchedStudents = studentsList.filter(s => 
    s.name.toLowerCase().includes(trimmed) ||
    s.email.toLowerCase().includes(trimmed) ||
    s.location.toLowerCase().includes(trimmed) ||
    s.currentPillar.toLowerCase().includes(trimmed)
  );

  // 3. Search Community Posts
  const matchedPosts = communityPosts.filter(p => 
    p.content.toLowerCase().includes(trimmed) ||
    p.category.toLowerCase().includes(trimmed) ||
    p.authorName.toLowerCase().includes(trimmed) ||
    (p.scriptureRef && p.scriptureRef.toLowerCase().includes(trimmed))
  );

  // 4. Search Q&A Questions
  const matchedQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(trimmed) ||
    q.category.toLowerCase().includes(trimmed) ||
    q.studentName.toLowerCase().includes(trimmed) ||
    (q.teachingTitle && q.teachingTitle.toLowerCase().includes(trimmed)) ||
    (q.answer?.answerText && q.answer.answerText.toLowerCase().includes(trimmed))
  );

  // 5. Search Events
  const matchedEvents = events.filter(e => 
    e.title.toLowerCase().includes(trimmed) ||
    e.location.toLowerCase().includes(trimmed) ||
    e.description.toLowerCase().includes(trimmed)
  );

  const totalResults = 
    matchedTeachings.length + 
    matchedStudents.length + 
    matchedPosts.length + 
    matchedQuestions.length + 
    matchedEvents.length;

  return {
    teachings: matchedTeachings,
    students: matchedStudents,
    posts: matchedPosts,
    questions: matchedQuestions,
    events: matchedEvents,
    totalResults,
  };
};
