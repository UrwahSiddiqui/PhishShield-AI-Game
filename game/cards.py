import random

class CardDeck:
    def __init__(self):
        self.attack_cards = ["Phishing", "Pretexting", "Baiting"]
        self.defense_cards = ["Firewall", "Antivirus", "User Training"]

    def defend(self, attack_type):
        defense = random.choice(self.defense_cards)
        return defense in ["Firewall", "Antivirus"]  # Successful if firewall/antivirus
