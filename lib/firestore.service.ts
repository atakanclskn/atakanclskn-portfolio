// Firestore Service - Tüm veri okuma/yazma işlemleri
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs,
  writeBatch,
  Timestamp
} from "firebase/firestore";
import { db } from "./firebase";
import { 
  Profile, 
  Project, 
  Experience, 
  TechItem, 
  Social,
  SectionContent,
  FooterSettings
} from "../types";

// ==================== PROFILE ====================
export const getProfile = async (): Promise<Profile | null> => {
  try {
    const docRef = doc(db, "settings", "profile");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Profile;
    }
    return null;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

export const saveProfile = async (profile: Profile): Promise<boolean> => {
  try {
    const docRef = doc(db, "settings", "profile");
    await setDoc(docRef, profile);
    return true;
  } catch (error) {
    console.error("Error saving profile:", error);
    return false;
  }
};

// ==================== PROJECTS ====================
export const getProjects = async (): Promise<Project[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projects: Project[] = [];
    querySnapshot.forEach((doc) => {
      projects.push({ _id: doc.id, ...doc.data() } as Project);
    });
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const saveProjects = async (projects: Project[]): Promise<boolean> => {
  try {
    const batch = writeBatch(db);
    
    // İlk önce mevcut projeleri silelim ve yenilerini ekleyelim
    const existingDocs = await getDocs(collection(db, "projects"));
    existingDocs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Yeni projeleri ekle
    projects.forEach((project) => {
      const docRef = doc(db, "projects", project._id);
      const { _id, ...projectData } = project;
      batch.set(docRef, projectData);
    });

    await batch.commit();
    return true;
  } catch (error) {
    console.error("Error saving projects:", error);
    return false;
  }
};

// ==================== EXPERIENCES ====================
export const getExperiences = async (): Promise<Experience[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "experiences"));
    const experiences: Experience[] = [];
    querySnapshot.forEach((doc) => {
      experiences.push({ _id: doc.id, ...doc.data() } as Experience);
    });
    return experiences;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
};

export const saveExperiences = async (experiences: Experience[]): Promise<boolean> => {
  try {
    const batch = writeBatch(db);
    
    const existingDocs = await getDocs(collection(db, "experiences"));
    existingDocs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    experiences.forEach((exp) => {
      const docRef = doc(db, "experiences", exp._id);
      const { _id, ...expData } = exp;
      batch.set(docRef, expData);
    });

    await batch.commit();
    return true;
  } catch (error) {
    console.error("Error saving experiences:", error);
    return false;
  }
};

// ==================== TECH STACK ====================
export const getTechStack = async (): Promise<TechItem[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "techStack"));
    const techItems: TechItem[] = [];
    querySnapshot.forEach((doc) => {
      techItems.push({ _id: doc.id, ...doc.data() } as TechItem);
    });
    return techItems;
  } catch (error) {
    console.error("Error fetching tech stack:", error);
    return [];
  }
};

export const saveTechStack = async (techStack: TechItem[]): Promise<boolean> => {
  try {
    const batch = writeBatch(db);
    
    const existingDocs = await getDocs(collection(db, "techStack"));
    existingDocs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    techStack.forEach((tech) => {
      const docRef = doc(db, "techStack", tech._id);
      const { _id, ...techData } = tech;
      batch.set(docRef, techData);
    });

    await batch.commit();
    return true;
  } catch (error) {
    console.error("Error saving tech stack:", error);
    return false;
  }
};

// ==================== SOCIALS ====================
export const getSocials = async (): Promise<Social[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "socials"));
    const socials: Social[] = [];
    querySnapshot.forEach((doc) => {
      socials.push({ _id: doc.id, ...doc.data() } as Social);
    });
    return socials;
  } catch (error) {
    console.error("Error fetching socials:", error);
    return [];
  }
};

export const saveSocials = async (socials: Social[]): Promise<boolean> => {
  try {
    const batch = writeBatch(db);
    
    const existingDocs = await getDocs(collection(db, "socials"));
    existingDocs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    socials.forEach((social) => {
      const docRef = doc(db, "socials", social._id);
      const { _id, ...socialData } = social;
      batch.set(docRef, socialData);
    });

    await batch.commit();
    return true;
  } catch (error) {
    console.error("Error saving socials:", error);
    return false;
  }
};

// ==================== SECTION CONTENT ====================
export const getSectionContent = async (): Promise<SectionContent | null> => {
  try {
    const docRef = doc(db, "settings", "sectionContent");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as SectionContent;
    }
    return null;
  } catch (error) {
    console.error("Error fetching section content:", error);
    return null;
  }
};

export const saveSectionContent = async (content: SectionContent): Promise<boolean> => {
  try {
    const docRef = doc(db, "settings", "sectionContent");
    await setDoc(docRef, content);
    return true;
  } catch (error) {
    console.error("Error saving section content:", error);
    return false;
  }
};

// ==================== FOOTER SETTINGS ====================
export const getFooterSettings = async (): Promise<FooterSettings | null> => {
  try {
    const docRef = doc(db, "settings", "footer");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as FooterSettings;
    }
    return null;
  } catch (error) {
    console.error("Error fetching footer settings:", error);
    return null;
  }
};

export const saveFooterSettings = async (settings: FooterSettings): Promise<boolean> => {
  try {
    const docRef = doc(db, "settings", "footer");
    await setDoc(docRef, settings);
    return true;
  } catch (error) {
    console.error("Error saving footer settings:", error);
    return false;
  }
};

// ==================== SAVE ALL DATA ====================
export const saveAllData = async (data: {
  profile: Profile;
  projects: Project[];
  experiences: Experience[];
  techStack: TechItem[];
  socials: Social[];
  sectionContent: SectionContent;
  footerSettings: FooterSettings;
}): Promise<boolean> => {
  try {
    const results = await Promise.all([
      saveProfile(data.profile),
      saveProjects(data.projects),
      saveExperiences(data.experiences),
      saveTechStack(data.techStack),
      saveSocials(data.socials),
      saveSectionContent(data.sectionContent),
      saveFooterSettings(data.footerSettings),
    ]);

    return results.every((r) => r === true);
  } catch (error) {
    console.error("Error saving all data:", error);
    return false;
  }
};

// ==================== LOAD ALL DATA ====================
export const loadAllData = async () => {
  try {
    const [profile, projects, experiences, techStack, socials, sectionContent, footerSettings] = 
      await Promise.all([
        getProfile(),
        getProjects(),
        getExperiences(),
        getTechStack(),
        getSocials(),
        getSectionContent(),
        getFooterSettings(),
      ]);

    return {
      profile,
      projects,
      experiences,
      techStack,
      socials,
      sectionContent,
      footerSettings,
    };
  } catch (error) {
    console.error("Error loading all data:", error);
    return null;
  }
};
