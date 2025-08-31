from mongoengine import (
    Document,
    StringField,
    IntField,
    BooleanField,
    ReferenceField,
    DateField,
)


class Promo(Document):
    # Long term, reccuring, ie weekly promo
    description = StringField(required=True)
    active = BooleanField(required=True)
    restaurant = StringField(required=True)
    day_of_week = StringField(
        choices=[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ]
    )


class Offer(Document):
    # Short term, one time promo, expires
    description = StringField(required=True)
    active = BooleanField(required=True)
    expiration_date = DateField(required=True)
    restaurant = StringField(required=True)