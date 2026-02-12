// Firestore Service - Tüm veri okuma/yazma işlemleri
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs,
  writeBatch,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  Timestamp
} from "firebase/firestore";
import { db } from "./firebase";
import { 
  Profile, 
  Project, 
  ExperienceItem, 
  TechItem, 
  Social,
  SectionContent,
  FooterSettings,
  ContactMessage
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
    // Undefined değerleri ve fonksiyonları temizle (Firestore bunları kabul etmez)
    const cleanProfile = JSON.parse(JSON.stringify(profile));
    console.log("Saving profile:", cleanProfile);
    await setDoc(docRef, cleanProfile);
    return true;
  } catch (error: any) {
    console.error("Error saving profile:", error);
    console.error("Profile data that failed:", JSON.stringify(profile, null, 2));
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
export const getExperiences = async (): Promise<ExperienceItem[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "experiences"));
    const experiences: ExperienceItem[] = [];
    querySnapshot.forEach((doc) => {
      experiences.push({ _id: doc.id, ...doc.data() } as ExperienceItem);
    });
    return experiences;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
};

export const saveExperiences = async (experiences: ExperienceItem[]): Promise<boolean> => {
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

// ==================== CONTACT MESSAGES ====================
export const saveContactMessage = async (message: ContactMessage): Promise<boolean> => {
  try {
    const docRef = doc(db, "messages", message._id);
    const { _id, ...messageData } = message;
    await setDoc(docRef, messageData);
    return true;
  } catch (error) {
    console.error("Error saving contact message:", error);
    return false;
  }
};

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "messages"));
    const messages: ContactMessage[] = [];
    querySnapshot.forEach((docSnap) => {
      messages.push({ _id: docSnap.id, ...docSnap.data() } as ContactMessage);
    });
    // Sort by createdAt descending (newest first)
    messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return messages;
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return [];
  }
};

export const updateContactMessage = async (id: string, data: Partial<ContactMessage>): Promise<boolean> => {
  try {
    const docRef = doc(db, "messages", id);
    await updateDoc(docRef, data as any);
    return true;
  } catch (error) {
    console.error("Error updating contact message:", error);
    return false;
  }
};

export const deleteContactMessage = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, "messages", id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting contact message:", error);
    return false;
  }
};

// ==================== SAVE ALL DATA ====================
export const saveAllData = async (data: {
  profile: Profile;
  projects: Project[];
  experiences: ExperienceItem[];
  techStack: TechItem[];
  socials: Social[];
  sectionContent: SectionContent;
  footerSettings: FooterSettings;
}): Promise<boolean> => {
  try {
    console.log("🔥 Firebase Save Started...");
    console.log("Data to save:", data);
    
    // Undefined değerleri temizle (Firestore undefined kabul etmez)
    const cleanData = JSON.parse(JSON.stringify(data));
    
    console.log("Cleaned data:", cleanData);
    
    const results = await Promise.all([
      saveProfile(cleanData.profile).then(r => { console.log("✅ Profile saved:", r); return r; }),
      saveProjects(cleanData.projects).then(r => { console.log("✅ Projects saved:", r); return r; }),
      saveExperiences(cleanData.experiences).then(r => { console.log("✅ Experiences saved:", r); return r; }),
      saveTechStack(cleanData.techStack).then(r => { console.log("✅ TechStack saved:", r); return r; }),
      saveSocials(cleanData.socials).then(r => { console.log("✅ Socials saved:", r); return r; }),
      saveSectionContent(cleanData.sectionContent).then(r => { console.log("✅ SectionContent saved:", r); return r; }),
      saveFooterSettings(cleanData.footerSettings).then(r => { console.log("✅ FooterSettings saved:", r); return r; }),
    ]);

    const success = results.every((r) => r === true);
    console.log("🔥 Firebase Save Complete:", success ? "SUCCESS" : "FAILED", results);
    return success;
  } catch (error) {
    console.error("❌ Error saving all data:", error);
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
