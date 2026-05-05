class DifficultyConfig:
    LEVELS = {
        'level1': {
            'airport_types': ['large_airport'],
            'score_multiplier': 1.0,
            'emissions_penalty_factor': 0.08
        },
        'level2': {
            'airport_types': ['large_airport', 'medium_airport'],
            'score_multiplier': 1.25,
            'emissions_penalty_factor': 0.10
        },
        'level3': {
            'airport_types': ['large_airport', 'medium_airport', 'small_airport'],
            'score_multiplier': 1.5,
            'emissions_penalty_factor': 0.12
        }
    }

    def __init__(self, level):
        if level not in self.LEVELS:
            raise ValueError(f'Invalid difficulty level: {level}')

        cfg = self.LEVELS[level]
        self.level = level
        self.airport_types = cfg['airport_types']
        self.score_multiplier = cfg['score_multiplier']
        self.emissions_penalty_factor = cfg['emissions_penalty_factor']

    @classmethod
    def exists(cls, level):
        return level in cls.LEVELS

    @classmethod
    def get_airport_types(cls, level):
        if level not in cls.LEVELS:
            raise ValueError(f'Invalid difficulty level: {level}')
        return cls.LEVELS[level]['airport_types']

    @classmethod
    def get_score_multiplier(cls, level):
        if level not in cls.LEVELS:
            raise ValueError(f'Invalid difficulty level: {level}')
        return cls.LEVELS[level]['score_multiplier']

    def calculate_score_penalty(self, emissions_kg):
        try:
            emissions = float(emissions_kg)
        except (TypeError, ValueError):
            emissions = 0
        return int(emissions * self.emissions_penalty_factor)