class Patient:
    def __init__(self, first_name,last_name, id, address,date_of_birth,phone,mobile_phone,positive, recovery):
        self.first_name = first_name
        self.last_name = last_name
        self.id = id
        self.date_of_birth = date_of_birth
        self.address = address
        self.phone = phone
        self.mobile_phone = mobile_phone
        self.positive = positive
        self.recovery = recovery

