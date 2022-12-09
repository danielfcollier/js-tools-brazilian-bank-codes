docker:
	@docker build -t tools-bank-codes .
	@docker create --name solution tools-bank-codes
	@docker cp solution:/app/output ${PWD}
	@docker rm -f solution
