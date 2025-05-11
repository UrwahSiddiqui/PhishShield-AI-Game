import random
from typing import List, Dict
from dataclasses import dataclass
from ui.systems.attack import Attack, PhishingAttack, RansomwareAttack, AIPoweredAttack, AttackType
from ui.systems.defense import Defense, DEFENSES, DefenseType

@dataclass
class GameState:
    security_score: int = 100
    resources: int = 100
    defenses: List[Defense] = None
    turn: int = 0
    game_over: bool = False
    
    def __post_init__(self):
        if self.defenses is None:
            self.defenses = []

class GameLogic:
    def __init__(self):
        self.state = GameState()
        self.attack_log = []
        
    def generate_attack(self) -> Attack:
        attack_weights = {
            AttackType.PHISHING: 0.3,
            AttackType.RANSOMWARE: 0.2,
            AttackType.MALWARE: 0.15,
            AttackType.DDOS: 0.1,
            AttackType.SOCIAL_ENGINEERING: 0.1,
            AttackType.AI_POWERED: 0.05 + (self.state.turn * 0.01),
            AttackType.ZERO_DAY: 0.1
        }
        
        attack_type = random.choices(
            list(attack_weights.keys()),
            weights=list(attack_weights.values()),
            k=1
        )[0]
        
        is_ai_enhanced = random.random() < (0.1 + (self.state.turn * 0.015))
        
        if attack_type == AttackType.PHISHING:
            return PhishingAttack(is_ai_enhanced)
        elif attack_type == AttackType.RANSOMWARE:
            return RansomwareAttack(is_ai_enhanced)
        elif attack_type == AttackType.AI_POWERED:
            return AIPoweredAttack()
        else:
            return Attack(
                name=f"Basic {attack_type.name.replace('_', ' ')}",
                attack_type=attack_type,
                base_damage=random.randint(15, 25),
                ai_enhanced=is_ai_enhanced
            )
    
    def process_turn(self) -> bool:
        attack = self.generate_attack()
        damage = attack.calculate_damage(self.state.defenses)
        self.state.security_score = max(0, self.state.security_score - damage)
        
        self.attack_log.append({
            'turn': self.state.turn,
            'attack': attack,
            'damage': damage,
            'defenses': [d.name for d in self.state.defenses],
            'security_remaining': self.state.security_score
        })
        
        print(f"\n=== Turn {self.state.turn} ===")
        print(f"Attack: {attack.name}")
        print(f"Damage: {damage}")
        print(f"Defenses: {[d.name for d in self.state.defenses]}")
        print(f"Security: {self.state.security_score}")
        
        self.state.turn += 1
        self.state.resources += 25
        
        if self.state.security_score <= 0:
            self.state.game_over = True
            print("GAME OVER - Your systems have been compromised!")
            return True
        return False
        
    def add_defense(self, defense_name: str) -> bool:
        defense = DEFENSES.get(defense_name)
        if not defense:
            return False
            
        if defense.cost > self.state.resources:
            return False
            
        new_defense = Defense(
            name=defense.name,
            defense_type=defense.defense_type,
            mitigation=defense.mitigation,
            level=1,
            cost=defense.cost
        )
        
        self.state.defenses.append(new_defense)
        self.state.resources -= defense.cost
        print(f"Added defense: {defense_name}")
        return True
        
    def upgrade_defense(self, defense_index: int) -> bool:
        if defense_index < 0 or defense_index >= len(self.state.defenses):
            return False
            
        defense = self.state.defenses[defense_index]
        if defense.cost > self.state.resources:
            return False
            
        defense.upgrade()
        self.state.resources -= defense.cost
        return True