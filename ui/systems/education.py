import random

EDUCATION_TIPS = {
    "Phishing": ["Tip 1: Check sender email", "Tip 2: Hover before clicking"],
    "Ransomware": ["Tip 1: Maintain backups", "Tip 2: Never pay ransom"]
}

class EducationSystem:
    def get_tip(self, attack_type):
        return random.choice(EDUCATION_TIPS.get(attack_type, ["When in doubt, verify!"]))