import pygame

class MainMenu:
    def __init__(self, screen):
        self.screen = screen
        self.font = pygame.font.SysFont('Arial', 32)
        self.title_font = pygame.font.SysFont('Arial', 48, bold=True)
        self.buttons = [
            {"text": "Start Game", "pos": (400, 300), "action": "start"},
            {"text": "Quit", "pos": (400, 400), "action": "quit"}
        ]
    
    def draw(self):
        # Draw title
        title = self.title_font.render("Phish & Shield", True, (255, 255, 255))
        self.screen.blit(title, (400 - title.get_width()//2, 150))
        
        # Draw buttons
        for button in self.buttons:
            text = self.font.render(button["text"], True, (255, 255, 255))
            rect = text.get_rect(center=button["pos"])
            pygame.draw.rect(self.screen, (50, 50, 150), rect.inflate(20, 10))
            self.screen.blit(text, rect)
    
    def handle_click(self, pos):
        for button in self.buttons:
            text = self.font.render(button["text"], True, (255, 255, 255))
            rect = text.get_rect(center=button["pos"])
            if rect.collidepoint(pos):
                return button["action"]
        return None