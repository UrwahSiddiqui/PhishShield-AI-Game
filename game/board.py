import pygame
import os

# Load board assets
BOARD_IMAGE = pygame.image.load(os.path.join("assets", "board.png"))

class Node:
    """Represents a node on the board (e.g., devices in a network)."""
    def __init__(self, x, y, node_type="device"):
        self.x = x
        self.y = y
        self.node_type = node_type  # Could be "device", "firewall", etc.
        self.is_compromised = False
        self.owner = None  # Attacker or Defender

    def mark_as_compromised(self):
        """Marks the node as compromised by an attack."""
        self.is_compromised = True
        self.owner = "Attacker"

    def secure(self):
        """Defender secures a node if they play the correct defense card."""
        self.is_compromised = False
        self.owner = "Defender"

class Board:
    """Manages the game board, nodes, and attacks."""
    def __init__(self):
        self.nodes = [
            Node(300, 200), Node(500, 250), Node(700, 300),
            Node(900, 350), Node(1100, 400), Node(600, 500)
        ]

    def get_node_at_position(self, x, y):
        """Returns the node at the given position (if any)."""
        for node in self.nodes:
            if (node.x - 20 <= x <= node.x + 20) and (node.y - 20 <= y <= node.y + 20):
                return node
        return None

    def perform_attack(self, node, attack_card):
        """Attacks a node with a given attack card."""
        if node and not node.is_compromised:
            node.mark_as_compromised()
            return True
        return False

    def perform_defense(self, node, defense_card):
        """Defends a node with a given defense card."""
        if node and node.is_compromised:
            node.secure()
            return True
        return False
