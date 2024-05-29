class ApiResponse {

  public author: {
    name: string,
    lastname: string,
  };
  [key: string]: any;

  constructor(
    properties: Record<string, any>
  ) {
    const name = process.env.AUTHOR_NAME;
    const lastname = process.env.AUTHOR_LASTNAME;
    if (!name || !lastname) {
      throw new Error('The environment variables "AUTHOR_NAME" and "AUTHOR_LASTNAME" should be set and have a value');
    }

    this.author = {
      name,
      lastname
    };

    Object.assign(this, properties);
  }

}

export default ApiResponse;
