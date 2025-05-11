import pygame
from typing import List
from ui.systems.attack import Attack
from ui.systems.defense import DEFENSES
from game.game_state import GameState

class GameScreen:
    def __init__(self, screen):
        self.screen = screen
        self.font = pygame.font.SysFont('Arial', 16)
        self.title_font = pygame.font.SysFont('Arial', 24, bold=True)
        
    def render(self, game_state: GameState, last_attack: Attack = None):
        self.screen.fill((240, 240, 240))
        
        # Controls
        self._render_text("Controls:", 600, 20, font=self.title_font)
        self._render_text("N - Next Turn", 600, 50)
        self._render_text("1-9 - Buy Defense", 600, 80)
        
        # Game status
        self._render_text(f"Turn: {game_state.turn}", 20, 20)
        self._render_text(f"Resources: {game_state.resources}", 20, 50)
        self._render_text(f"Security Score: {game_state.security_score}", 20, 80)
        
        # Last attack
        if last_attack:
            damage = last_attack.calculate_damage(game_state.defenses)
            attack_text = f"Last Attack: {last_attack.name} (-{damage})"
            color = (200, 50, 50) if damage > 20 else (150, 50, 50)
            self._render_text(attack_text, 20, 120, color=color)
            
        # Current defenses
        self._render_text("Your Defenses:", 400, 20, font=self.title_font)
        for i, defense in enumerate(game_state.defenses):
            defense_text = f"{i+1}. {defense.name} (Lvl {defense.level})"
            self._render_text(defense_text, 400, 50 + i * 30)
            
        # Available defenses
        self._render_text("Available Defenses:", 20, 180, font=self.title_font)
        for i, (name, defense) in enumerate(DEFENSES.items()):
            color = (0, 100, 0) if defense.cost <= game_state.resources else (100, 0, 0)
            defense_text = f"{i+1}. {name} (Cost: {defense.cost})"
            self._render_text(defense_text, 20, 210 + i * 30, color=color)
            
        pygame.display.flip()
        
    def _render_text(self, text: str, x: int, y: int, color=(0, 0, 0), font=None):
        font = font or self.font
        text_surface = font.render(text, True, color)
        self.screen.blit(text_surface, (x, y))