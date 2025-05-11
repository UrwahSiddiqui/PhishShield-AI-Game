class HintSystem:
    def get_hint(self, attack_type):
        hints = {
            "Phishing": "Look for suspicious links!",
            "Ransomware": "Isolate infected devices!"
        }
        return hints.get(attack_type, "Stay vigilant!")