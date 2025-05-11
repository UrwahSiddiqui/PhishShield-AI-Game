import sys
import os
from pathlib import Path

# Add project paths
project_root = str(Path(__file__).parent)
sys.path.append(project_root)
sys.path.append(os.path.join(project_root, "game"))
sys.path.append(os.path.join(project_root, "ui"))

import pygame
from game.game_logic import GameLogic
from ui.game_screen import GameScreen
from ui.main_menu import MainMenu
from ui.systems.defense import DEFENSES

def main():
    # Initialize pygame
    pygame.init()
    screen = pygame.display.set_mode((800, 600))
    pygame.display.set_caption("Phish & Shield")
    clock = pygame.time.Clock()
    
    # Initialize game systems
    game = GameLogic()
    game_screen = GameScreen(screen)
    menu = MainMenu(screen)
    
    # Game state
    current_screen = "menu"
    running = True
    last_attack = None
    
    while running:
        # Event handling
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            
            if current_screen == "menu":
                if event.type == pygame.MOUSEBUTTONDOWN:
                    action = menu.handle_click(event.pos)
                    if action == "start":
                        current_screen = "game"
                        game = GameLogic()  # Reset game
                        last_attack = None
            
            elif current_screen == "game":
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_n:
                        game_over = game.process_turn()
                        if game.attack_log:
                            last_attack = game.attack_log[-1]['attack']
                        if game_over:
                            current_screen = "menu"
                    elif pygame.K_1 <= event.key <= pygame.K_9:
                        defense_index = event.key - pygame.K_1
                        if defense_index < len(DEFENSES):
                            defense_name = list(DEFENSES.keys())[defense_index]
                            game.add_defense(defense_name)
                
                elif event.type == pygame.MOUSEBUTTONDOWN:
                    mouse_pos = pygame.mouse.get_pos()
                    defense_y_start = 210
                    defense_height = 30
                    if 20 <= mouse_pos[0] <= 300 and defense_y_start <= mouse_pos[1] <= defense_y_start + len(DEFENSES)*defense_height:
                        defense_index = (mouse_pos[1] - defense_y_start) // defense_height
                        if 0 <= defense_index < len(DEFENSES):
                            defense_name = list(DEFENSES.keys())[defense_index]
                            game.add_defense(defense_name)
        
        # Rendering
        screen.fill((0, 0, 0))
        
        if current_screen == "menu":
            menu.draw()
        elif current_screen == "game":
            game_screen.render(game.state, last_attack)
        
        pygame.display.flip()
        clock.tick(60)
    
    pygame.quit()

if __name__ == "__main__":
    main()