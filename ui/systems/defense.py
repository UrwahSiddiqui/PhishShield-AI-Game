from enum import Enum, auto
from dataclasses import dataclass
from typing import Dict, List, TYPE_CHECKING

if TYPE_CHECKING:
    from ..systems.attack import AttackType

class DefenseType(Enum):
    FIREWALL = auto()
    ANTIVIRUS = auto()
    EMAIL_FILTER = auto()
    BACKUP = auto()
    AI_MONITOR = auto()
    PATCH_MANAGEMENT = auto()
    EMPLOYEE_TRAINING = auto()

@dataclass 
class Defense:
    name: str
    defense_type: DefenseType
    mitigation: float
    level: int = 1
    cost: int = 25
    
    def is_effective_against(self, attack_type: 'AttackType') -> bool:
        """Check if defense works against given attack type"""
        from ..systems.attack import AttackType  # Local import
        
        effectiveness_map = {
            DefenseType.FIREWALL: [AttackType.DDOS, AttackType.MALWARE],
            DefenseType.ANTIVIRUS: [AttackType.MALWARE, AttackType.RANSOMWARE],
            DefenseType.EMAIL_FILTER: [AttackType.PHISHING],
            DefenseType.BACKUP: [AttackType.RANSOMWARE],
            DefenseType.AI_MONITOR: [AttackType.AI_POWERED, AttackType.PHISHING],
            DefenseType.PATCH_MANAGEMENT: [AttackType.ZERO_DAY],
            DefenseType.EMPLOYEE_TRAINING: [AttackType.PHISHING, AttackType.SOCIAL_ENGINEERING]
        }
        return attack_type in effectiveness_map.get(self.defense_type, [])

    # Rest of your Defense class...
    def upgrade(self) -> None:
        """Increase defense level"""
        self.level += 1
        self.cost = round(self.cost * 1.5)

# Predefined defenses
DEFENSES = {
    "Basic Firewall": Defense("Basic Firewall", DefenseType.FIREWALL, 0.4, cost=30),
    "Email Protection": Defense("Email Protection", DefenseType.EMAIL_FILTER, 0.5, cost=25),
    "Anti-Ransomware": Defense("Anti-Ransomware", DefenseType.ANTIVIRUS, 0.6, cost=40),
    "Backup System": Defense("Backup System", DefenseType.BACKUP, 0.8, cost=50),
    "AI Security": Defense("AI Security", DefenseType.AI_MONITOR, 0.7, cost=60),
    "Staff Training": Defense("Staff Training", DefenseType.EMPLOYEE_TRAINING, 0.55, cost=20)
}