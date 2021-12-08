# Make:

build:
	@echo "ECC key 產生"


create-key:
	// p-256
	openssl ecparam -name prime256v1 -genkey -noout -out key.pem
	// p-384
	openssl ecparam -name secp384r1 -genkey -noout -out key.pem
	// p-521
	openssl ecparam -name secp521r1 -genkey -noout -out key.pem

pubkey:
	openssl ec -in key.pem -pubout -out public.pem