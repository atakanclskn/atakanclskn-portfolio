import { Project, Profile } from '../types';

const GITHUB_USERNAME = 'atakanclskn'; // Değiştirilebilir

export const fetchGitHubProfile = async (): Promise<Partial<Profile> | null> => {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (!response.ok) return null;
    const data = await response.json();
    
    return {
      bio: data.bio,
      location: data.location,
      avatarUrl: data.avatar_url,
      name: data.name || data.login,
      status: 'Open Source Contributor'
    };
  } catch (error) {
    console.error("GitHub Profile Error:", error);
    return null;
  }
};

export const fetchGitHubRepos = async (): Promise<Project[]> => {
  try {
    // Sort by updated to get latest work, fetch top 6
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=owner`);
    
    if (!response.ok) return [];
    
    const repos = await response.json();

    return repos.map((repo: any, index: number) => ({
      _id: `gh-${repo.id}`,
      title: repo.name,
      category: 'Open Source',
      description: repo.description || 'No description available.',
      // Automatically generate OpenGraph image from GitHub
      mainImage: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`,
      size: index === 0 || index === 3 ? 'large' : 'small', // Simple layout logic
      link: repo.html_url,
      githubUrl: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
      isLiveData: true
    }));
  } catch (error) {
    console.error("GitHub Repos Error:", error);
    return [];
  }
};