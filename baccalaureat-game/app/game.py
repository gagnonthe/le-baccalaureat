from flask import session
import random

class Game:
    def __init__(self):
        self.players = {}
        self.current_letter = ''
        self.scores = {}
        self.categories = ['Animals', 'Countries', 'Fruits', 'Colors']
        self.rounds = 0

    def add_player(self, player_id):
        if player_id not in self.players:
            self.players[player_id] = {'score': 0}
            self.scores[player_id] = 0

    def remove_player(self, player_id):
        if player_id in self.players:
            del self.players[player_id]
            del self.scores[player_id]

    def start_new_round(self):
        self.current_letter = self.generate_random_letter()
        self.rounds += 1

    def generate_random_letter(self):
        alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        return random.choice(alphabet)

    def submit_answer(self, player_id, category, answer):
        if player_id in self.players and category in self.categories:
            # Logic to check if the answer is valid and update scores
            self.players[player_id]['score'] += 1  # Simplified scoring logic
            self.scores[player_id] += 1

    def get_scores(self):
        return self.scores

    def reset_game(self):
        self.players.clear()
        self.scores.clear()
        self.rounds = 0
        self.current_letter = ''