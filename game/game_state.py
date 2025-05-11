from dataclasses import dataclass
from typing import List
from ui.systems.defense import Defense

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