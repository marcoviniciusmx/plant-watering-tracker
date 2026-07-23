# Prompt para o Claude Design — Regador de Plantas

Design a clean, friendly web app UI for a personal plant watering
tracker called "Regador de Plantas". The app helps someone remember
when to water their houseplants.

Main screen: a grid or list of plant cards. Each card shows the
plant's name, species, and a colored status indicator representing
its watering state:
- Light gray = never watered yet (just registered)
- Green = watered, more than 2 days until next watering is due
- Yellow = 1-2 days left until next watering is due
- Orange-red = watering is due today
- Red = watering is overdue

Each card should have a clear "Water now" action (button or icon) that
opens a small form to log the watering date (defaulting to today, but
editable — a plain date picker), plus edit and delete actions for the
plant itself.

There's also a simple form/modal for registering a new plant, with
three fields: name, species, and watering interval in days.

Visual style: organic, calm, plant-themed but not childish — think
soft greens, warm neutrals (off-white/cream background), rounded
cards with soft shadows, generous whitespace. Typography should be
clean and modern (sans-serif). The overall feel should be simple and
uncluttered, appropriate for a small personal utility app, not a
commercial SaaS product.

Include: the main plant grid/list view, the "register new plant" form,
and the "water now" date-picker form. Show how the status colors look
against the card background in both a light theme.
