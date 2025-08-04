from mongoengine import Document, StringField, IntField, BooleanField

class Deal(Document):
    restuarant=StringField(required=True)
    description=StringField(required=True)
    active=BooleanField(required=True)

    
