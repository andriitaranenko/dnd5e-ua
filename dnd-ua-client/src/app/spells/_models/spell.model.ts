export interface Spell {
  originalName: string;
  
  sourceUrl: string;
  
  translatedName: string;
  
  level: number;
  
  castingTime: string;
  
  range: number;
  
  components: string[];
  
  duration: number;
  
  description: string;
  
  spellUsers: string[];
}