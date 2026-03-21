from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from api.models import Restaurant, Menu, MenuItem, Deal


class Command(BaseCommand):
    help = 'Seeds the database with sample San Francisco restaurant and deal data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding data...')

        # Restaurant 1 — deal expiring in 6 hours (countdown shown)
        r1, _ = Restaurant.objects.get_or_create(
            name='The Wooden Spoon',
            defaults={
                'description': 'Farm-to-table California cuisine with seasonal ingredients sourced from local farms.',
                'latitude': '37.774900',
                'longitude': '-122.419400',
                'address': '123 Market St, San Francisco, CA 94105',
                'image_url': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
                'cuisine_type': 'American',
            }
        )
        menu1, _ = Menu.objects.get_or_create(
            restaurant=r1, name='Dinner Menu',
            defaults={'description': 'Evening seasonal offerings', 'is_active': True}
        )
        MenuItem.objects.get_or_create(
            menu=menu1, name='Grilled Salmon',
            defaults={'description': 'Wild-caught salmon with lemon butter and roasted vegetables', 'price': '28.00', 'category': 'Mains'}
        )
        MenuItem.objects.get_or_create(
            menu=menu1, name='Caesar Salad',
            defaults={'description': 'Romaine, house-made dressing, parmesan crisp', 'price': '14.00', 'category': 'Starters'}
        )
        MenuItem.objects.get_or_create(
            menu=menu1, name='Butternut Squash Soup',
            defaults={'description': 'Seasonal soup with crème fraîche and chives', 'price': '12.00', 'category': 'Starters'}
        )
        MenuItem.objects.get_or_create(
            menu=menu1, name='Braised Short Rib',
            defaults={'description': '12-hour braised with red wine jus and mashed potato', 'price': '36.00', 'category': 'Mains'}
        )
        Deal.objects.get_or_create(
            restaurant=r1,
            title='Happy Hour: 30% Off All Mains',
            defaults={
                'description': 'Valid for dine-in only. Includes all main course items.',
                'discount_percentage': '30.00',
                'original_price': '28.00',
                'deal_price': '19.60',
                'expiration_time': timezone.now() + timedelta(hours=6),
                'is_active': True,
            }
        )

        # Restaurant 2 — deal expiring in 23 hours (shows in Ending Soon + countdown)
        r2, _ = Restaurant.objects.get_or_create(
            name='Sakura Ramen',
            defaults={
                'description': 'Authentic Hakata-style tonkotsu ramen made from 18-hour pork bone broth.',
                'latitude': '37.783100',
                'longitude': '-122.408900',
                'address': '456 Powell St, San Francisco, CA 94108',
                'image_url': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
                'cuisine_type': 'Japanese',
            }
        )
        menu2, _ = Menu.objects.get_or_create(
            restaurant=r2, name='Main Menu',
            defaults={'description': 'Full ramen and izakaya selection', 'is_active': True}
        )
        MenuItem.objects.get_or_create(
            menu=menu2, name='Tonkotsu Ramen',
            defaults={'description': 'Rich pork bone broth, chashu pork, soft-boiled egg, nori', 'price': '16.00', 'category': 'Ramen'}
        )
        MenuItem.objects.get_or_create(
            menu=menu2, name='Spicy Miso Ramen',
            defaults={'description': 'House miso tare, corn, butter, ground pork', 'price': '17.00', 'category': 'Ramen'}
        )
        MenuItem.objects.get_or_create(
            menu=menu2, name='Gyoza (6pc)',
            defaults={'description': 'Pan-fried pork and cabbage dumplings with ponzu', 'price': '9.00', 'category': 'Sides'}
        )
        MenuItem.objects.get_or_create(
            menu=menu2, name='Karaage Chicken',
            defaults={'description': 'Japanese fried chicken with kewpie mayo and lemon', 'price': '12.00', 'category': 'Sides'}
        )
        Deal.objects.get_or_create(
            restaurant=r2,
            title='Lunch Special: Ramen + Gyoza Combo',
            defaults={
                'description': 'Any ramen paired with gyoza (6pc). Limited seats available.',
                'discount_percentage': '20.00',
                'original_price': '25.00',
                'deal_price': '20.00',
                'expiration_time': timezone.now() + timedelta(hours=23),
                'is_active': True,
            }
        )

        # Restaurant 3 — deal expiring in 3 days (no countdown, all-deals grid only)
        r3, _ = Restaurant.objects.get_or_create(
            name='Bella Napoli',
            defaults={
                'description': 'Neapolitan pizza and handmade pasta from a family recipe going back three generations.',
                'latitude': '37.769400',
                'longitude': '-122.486200',
                'address': '789 Castro St, San Francisco, CA 94114',
                'image_url': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
                'cuisine_type': 'Italian',
            }
        )
        menu3, _ = Menu.objects.get_or_create(
            restaurant=r3, name='Pizze e Paste',
            defaults={'description': 'Pizzas and handmade pastas', 'is_active': True}
        )
        MenuItem.objects.get_or_create(
            menu=menu3, name='Margherita Pizza',
            defaults={'description': 'San Marzano tomato, fior di latte, fresh basil', 'price': '18.00', 'category': 'Pizza'}
        )
        MenuItem.objects.get_or_create(
            menu=menu3, name='Diavola Pizza',
            defaults={'description': 'Spicy salami, nduja, chili, mozzarella', 'price': '21.00', 'category': 'Pizza'}
        )
        MenuItem.objects.get_or_create(
            menu=menu3, name='Cacio e Pepe',
            defaults={'description': 'Tonnarelli pasta, aged pecorino, black pepper', 'price': '19.00', 'category': 'Pasta'}
        )
        MenuItem.objects.get_or_create(
            menu=menu3, name='Tiramisu',
            defaults={'description': 'Classic with savoiardi, mascarpone, espresso', 'price': '9.00', 'category': 'Desserts'}
        )
        Deal.objects.get_or_create(
            restaurant=r3,
            title='Two Pizzas for $35',
            defaults={
                'description': 'Any two 12-inch pizzas from our full menu.',
                'discount_percentage': '24.00',
                'original_price': '46.00',
                'deal_price': '35.00',
                'expiration_time': timezone.now() + timedelta(days=3),
                'is_active': True,
            }
        )

        self.stdout.write(self.style.SUCCESS('Seed data created successfully.'))
