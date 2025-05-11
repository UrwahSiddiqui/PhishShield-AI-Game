import pygame
import sys
from pathlib import Path

# Add project root to path
sys.path.append(str(Path(__file__).parent))

# Update imports to use full paths
from ui.systems.attack import AttackSystem
from ui.systems.defense import DefenseSystem
from ui.systems.hints import HintSystem
from ui.systems.education import EducationSystem

class PhishShieldGame:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((1200, 800))
        pygame.display.set_caption("Phish Shield - Cyber Trainer")
        self.clock = pygame.time.Clock()
        
        # Game systems
        self.attack = AttackSystem()
        self.defense = DefenseSystem()
        self.hints = HintSystem()
        self.education = EducationSystem()
        
        # Game state
        self.nodes = [
            {"name": "Email Server", "security": 3, "max": 5, "pos": (200, 200)},
            {"name": "HR Database", "security": 3, "max": 5, "pos": (200, 400)},
            {"name": "Firewall", "security": 4, "max": 5, "pos": (200, 600)},
            {"name": "CEO's Laptop", "security": 5, "max": 5, "pos": (200, 800)},
            {"name": "IDS", "security": 2, "max": 5, "pos": (400, 600)}
        ]
        
        self.current_attack = None
        self.game_state = "menu"  # menu/attack/defense/results
        self.defense_options = []
        self.selected_defense = None
        self.score = 0
        self.level = 1
        self.detected_threats = 0
        self.showing_tip = False

    def run(self):
        while True:
            self.handle_events()
            self.update()
            self.render()
            self.clock.tick(60)

    def handle_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.MOUSEBUTTONDOWN:
                self.handle_click(pygame.mouse.get_pos())

    def update(self):
        if self.game_state == "attack":
            self.current_attack = self.attack.generate(self.nodes)
            self.defense_options = self.defense.get_defense_options(self.current_attack['type'])
            self.game_state = "defense"

    def render(self):
        self.screen.fill((20, 20, 40))
        # [Rest of rendering code...]
        pygame.display.flip()

if __name__ == "__main__":
    game = PhishShieldGame()
    game.run()