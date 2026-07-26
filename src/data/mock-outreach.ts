import { SSGIImpactData } from '../types';

export const ssgiImpactMock: SSGIImpactData = {
  campaignName: 'Secondary School Gospel Invasion (SSGI)',
  region: 'Ekiti State, Nigeria',
  dateRange: 'Late October – November 2025',
  schoolsVisited: 38,
  studentsReached: 12400,
  biblesDistributed: 4200,
  volunteersMobilized: 185,
  stories: [
    {
      id: 'ssgi-s1',
      schoolName: 'Christ’s School, Ado-Ekiti',
      location: 'Ado-Ekiti Local Government Area',
      snippet: 'Student assemblies gathered as volunteers delivered clear salvation messages and distributed School of Tyrannus youth discipleship booklets.',
      fullStory: 'During the 3-day invasion at Christ’s School, over 800 senior secondary students participated in morning chapel exhortations. Discipleship follow-up cells were established with local Christian teachers overseeing weekly meetings.',
      imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'ssgi-s2',
      schoolName: 'Fiwasaye Girls’ Grammar School, Akure / Border Outreach',
      location: 'Sub-Regional Outreach Initiative',
      snippet: 'Youth fellowship leaders collaborated to lead prayer sessions and distribute youth study guides.',
      fullStory: 'Lively Stones outreach teams engaged female students in breakout groups focused on moral purity, spiritual identity, and academic excellence rooted in Christ.',
      imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'ssgi-s3',
      schoolName: 'Federal Government College, Ikole-Ekiti',
      location: 'Ikole LGA',
      snippet: 'Apostolic team members led intense worship sessions followed by personal counseling and scripture gift distributions.',
      fullStory: 'Over 60 student leaders across various fellowships joined forces for a joint weekend prayer retreat to sustain momentum following the campus invasion.',
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
    }
  ]
};
