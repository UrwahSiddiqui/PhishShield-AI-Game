from __future__ import annotations
from typing import List, TYPE_CHECKING
from enum import Enum, auto
import random
from dataclasses import dataclass

if TYPE_CHECKING:
    from ui.systems.defense import Defense, DefenseType

class AttackType(Enum):
    PHISHING = auto()
    RANSOMWARE = auto()
    MALWARE = auto()
    DDOS = auto()
    SOCIAL_ENGINEERING = auto()
    AI_POWERED = auto()
    ZERO_DAY = auto()

@dataclass
class Attack:
    name: str
    attack_type: AttackType
    base_damage: int
    evasion: float = 0.0
    description: str = ""
    ai_enhanced: bool = False
    
    @property
    def damage(self):
        return self.base_damage  # Or calculate based on other factors
    
    def calculate_damage(self, defenses: List['Defense']) -> int:
        """Calculate damage after applying defenses"""
        from ui.systems.defense import Defense
        
        if self.ai_enhanced and random.random() < self.evasion:
            return self.base_damage
            
        mitigated = self.base_damage
        for defense in defenses:
            if defense.is_effective_against(self.attack_type):
                mitigated *= (1 - defense.mitigation)
                
        return round(max(1, mitigated))

class PhishingAttack(Attack):
    def __init__(self, is_ai_enhanced=False):
        variants = [
            ("Spear Phishing Email", 20),
            ("CEO Fraud", 25),
            ("Fake Invoice", 15),
            ("Credential Harvesting", 30)
        ]
        name, damage = random.choice(variants)
        super().__init__(
            name=name,
            attack_type=AttackType.PHISHING,
            base_damage=damage,
            evasion=0.15 if is_ai_enhanced else 0.05,
            ai_enhanced=is_ai_enhanced,
            description="Deceptive attempt to steal sensitive information"
        )

class RansomwareAttack(Attack):
    def __init__(self, is_ai_enhanced=False):
        variants = [
            ("CryptoLocker Variant", 40),
            ("WannaCry Variant", 35),
            ("Ryuk Variant", 45)
        ]
        name, damage = random.choice(variants)
        super().__init__(
            name=name,
            attack_type=AttackType.RANSOMWARE,
            base_damage=damage,
            evasion=0.1 if is_ai_enhanced else 0,
            ai_enhanced=is_ai_enhanced,
            description="Malicious software that encrypts files for ransom"
        )
        
    def calculate_damage(self, defenses: List[Defense]) -> int:
        from ui.systems.defense import DefenseType  # Local import
        
        damage = super().calculate_damage(defenses)
        has_backup = any(d.defense_type == DefenseType.BACKUP for d in defenses)
        if not has_backup:
            damage = round(damage * 1.5)  # 50% more damage without backups
        return damage

class AIPoweredAttack(Attack):
    def __init__(self):
        super().__init__(
            name="Adaptive AI Threat",
            attack_type=AttackType.AI_POWERED,
            base_damage=35,
            evasion=0.25,
            ai_enhanced=True,
            description="AI-driven attack that learns from your defenses"
        )